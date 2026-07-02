import sqlite3

DATABASE = "community_compliance.db"


def get_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():

    conn = get_connection()
    cursor = conn.cursor()

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
        latitude REAL,
        longitude REAL

    )
    """)

    conn.commit()
    conn.close()
    
def save_complaint(data):

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO complaints (
                complaint,
                image_name,
                category,
                latitude,
                longitude,
                priority,
                department,
                summary,
                confidence,
                estimated_response_time,
                recommended_action
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (

            data["complaint"],
            data["image_name"],
            data["category"],
            data["latitude"],
            data["longitude"],
            data["priority"],
            data["department"],
            data["summary"],
            data["confidence"],
            data["estimated_response_time"],
            data["recommended_action"]

        ))

        conn.commit()
        conn.close()
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
def update_complaint_status(complaint_id, status):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE complaints
        SET status = ?
        WHERE id = ?
        """,
        (status, complaint_id)
    )

    conn.commit()
    conn.close()