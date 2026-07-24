import sqlite3
import math
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE = os.getenv("DATABASE", "community_compliance.db")


def get_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db():

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        email TEXT NOT NULL UNIQUE COLLATE NOCASE,

        password_hash TEXT NOT NULL,

        role TEXT NOT NULL CHECK(role IN ('citizen', 'officer', 'admin')),

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS complaints (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        complaint TEXT,

        image_name TEXT,

        category TEXT,

        priority TEXT,

        department TEXT,

        summary TEXT,

        confidence TEXT,

        estimated_response_time TEXT,

        recommended_action TEXT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'Pending',
        officer_id INTEGER,
        officer_remarks TEXT,

        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        cluster_id INTEGER,
        latitude REAL,
        longitude REAL,
        address TEXT,
        municipal_responsibility INTEGER,

appropriate_authority TEXT,

citizen_guidance TEXT,
FOREIGN KEY (officer_id) REFERENCES users(id),
    FOREIGN KEY (cluster_id) REFERENCES incident_clusters(id)

    )
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS incident_clusters (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        category TEXT,

        latitude REAL,

        longitude REAL,

        address TEXT,

        priority TEXT,

        report_count INTEGER DEFAULT 1,

        status TEXT DEFAULT 'Open',

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)
""")

    conn.commit()
    conn.close()
    
def save_complaint(data):

    required = [
        "complaint",
        "category",
        "latitude",
        "longitude"
    ]

    for field in required:
        if not data.get(field):
            raise ValueError(f"{field} is required")

    try:
        latitude = float(data["latitude"])
        longitude = float(data["longitude"])
    except (ValueError, TypeError):
        raise ValueError("Latitude and longitude must be valid numbers")

    if not (-90 <= latitude <= 90):
        raise ValueError("Invalid latitude")

    if not (-180 <= longitude <= 180):
        raise ValueError("Invalid longitude")

    # Store the converted values back
    data["latitude"] = latitude
    data["longitude"] = longitude

    # -----------------------------------
    # Find existing cluster
    # -----------------------------------

    cluster = find_nearby_cluster(
        data["category"],
        data["latitude"],
        data["longitude"]
    )

    # -----------------------------------
    # Existing cluster
    # -----------------------------------

    if cluster:

        cluster_id = cluster["id"]

        increment_cluster_report(cluster_id)

        update_cluster_priority(cluster_id)

    # -----------------------------------
    # Create new cluster
    # -----------------------------------

    else:

        cluster_id = create_cluster(data)

    # -----------------------------------
    # Save complaint
    # -----------------------------------

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO complaints (

            complaint,
            image_name,
            category,
            cluster_id,
            latitude,
            longitude,
            address,
            priority,
            department,
            summary,
            confidence,
            estimated_response_time,
            recommended_action,
            municipal_responsibility,
            appropriate_authority,
            citizen_guidance

        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

    """, (

        data["complaint"],
        data["image_name"],
        data["category"],
        cluster_id,
        data["latitude"],
        data["longitude"],
        data["address"],
        data["priority"],                      # Gemini priority
        data["department"],
        data["summary"],
        data["confidence"],
        data["estimated_response_time"],
        data["recommended_action"],
        data["municipal_responsibility"],
        data["appropriate_authority"],
        data["citizen_guidance"]

    ))

    complaint_id = cursor.lastrowid

    conn.commit()
    conn.close()

    return complaint_id
def get_all_complaints():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM complaints
        ORDER BY created_at DESC
    """)

    complaints = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return complaints

def get_dashboard_stats():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM complaints")
    total = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM complaints WHERE priority = 'High'")
    high = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM complaints WHERE priority = 'Medium'")
    medium = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM complaints WHERE priority = 'Low'")
    low = cursor.fetchone()[0]

    cursor.execute("""
        SELECT *
        FROM complaints
        ORDER BY created_at DESC
        LIMIT 5
    """)

    recent = [dict(row) for row in cursor.fetchall()]
    cursor.execute("""
    SELECT category, COUNT(*) as count
    FROM complaints
    GROUP BY category
    ORDER BY count DESC
    LIMIT 5
    """)

    categories = [dict(row) for row in cursor.fetchall()]
    conn.close()

    return {
        "total": total,
        "high_priority": high,
        "medium_priority": medium,
        "low_priority": low,
        "recent_complaints": recent,
        "categories": categories
    }
def update_complaint_status(complaint_id, status, remarks):

    print("Status:", status)
    print("Remarks:", remarks)

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE complaints
        SET
            status = ?,
            officer_remarks = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        """,
        (status, remarks, complaint_id)
    )

    conn.commit()
    cursor.execute(
        "SELECT officer_remarks FROM complaints WHERE id = ?",
        (complaint_id,)
    )

    print("DB value:", cursor.fetchone()[0])
    conn.close()
def create_user(name, email, password_hash, role="citizen"):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO users (name, email, password_hash, role)
        VALUES (?, ?, ?, ?)
    """, (name, email, password_hash, role))

    conn.commit()
    conn.close()
def get_user_by_email(email):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM users
        WHERE email = ?
        """,
        (email,)
    )

    user = cursor.fetchone()

    conn.close()

    return user
def login_user(email):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM users
        WHERE email = ?
    """, (email,))

    user = cursor.fetchone()

    conn.close()

    return user

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371000  # meters

    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)

    d_phi = math.radians(lat2 - lat1)
    d_lambda = math.radians(lon2 - lon1)

    a = (
        math.sin(d_phi / 2) ** 2
        + math.cos(phi1)
        * math.cos(phi2)
        * math.sin(d_lambda / 2) ** 2
    )

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c

def find_nearby_cluster(category, latitude, longitude, radius=100):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM incident_clusters
        WHERE category = ?
    """, (category,))

    clusters = cursor.fetchall()

    conn.close()

    for cluster in clusters:

        distance = haversine_distance(
            latitude,
            longitude,
            cluster["latitude"],
            cluster["longitude"]
        )

        if distance <= radius:
            return dict(cluster)

    return None

def create_cluster(data):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO incident_clusters(
            category,
            latitude,
            longitude,
            address,
            priority
        )
        VALUES (?, ?, ?, ?, ?)
    """, (

        data["category"],
        data["latitude"],
        data["longitude"],
        data["address"],
        data["priority"]

    ))

    cluster_id = cursor.lastrowid

    conn.commit()
    conn.close()

    return cluster_id

def increment_cluster_report(cluster_id):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE incident_clusters
        SET
            report_count = report_count + 1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    """, (cluster_id,))

    conn.commit()
    conn.close()
    
def get_cluster(cluster_id):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM incident_clusters
        WHERE id = ?
    """, (cluster_id,))

    cluster = cursor.fetchone()

    conn.close()

    return dict(cluster) if cluster else None

def update_cluster_priority(cluster_id):

    cluster = get_cluster(cluster_id)

    reports = cluster["report_count"]

    if reports >= 15:
        priority = "Critical"

    elif reports >= 7:
        priority = "High"

    elif reports >= 3:
        priority = "Medium"

    else:
        priority = "Low"

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE incident_clusters
        SET
            priority = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    """, (priority, cluster_id))

    conn.commit()
    conn.close()

    return priority
    
def get_all_clusters():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM incident_clusters
        ORDER BY report_count DESC
    """)

    clusters = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return clusters

def get_cluster_complaints(cluster_id):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM complaints
        WHERE cluster_id = ?
        ORDER BY created_at DESC
    """, (cluster_id,))

    complaints = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return complaints

