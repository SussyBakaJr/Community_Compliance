from flask import Flask, request, jsonify
from flask_cors import CORS

from services.geocoding_service import reverse_geocode
from services.gemini_service import analyze_complaint
from database.database import (
    init_db,
    save_complaint,
    get_all_complaints,
    get_dashboard_stats,
    update_complaint_status
)

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return {"message": "Backend running"}


@app.route("/analyze", methods=["POST"])

def analyze():

    complaint = request.form.get("complaint", "")
    latitude = request.form.get("latitude")
    longitude = request.form.get("longitude")

    image = request.files.get("image")

    print("Complaint:", complaint)

    if image:
        print("Image received:", image.filename)
    else:
        print("No image uploaded.")

    result = analyze_complaint(complaint, image)
    print(result)
    if latitude and longitude:
        address = reverse_geocode(latitude, longitude)
    else:
        address = None
    save_complaint({

        "complaint": complaint,
        "latitude": latitude,
        "longitude": longitude,
        "address": address,
        "image_name": image.filename if image else None,
        "category": result["category"],
        "priority": result["priority"],
        "department": result["department"],
        "summary": result["summary"],
        "confidence": result["confidence"],
        "estimated_response_time": result["estimated_response_time"],
        "recommended_action": result["recommended_action"],
        "municipal_responsibility": result["municipal_responsibility"],
        "appropriate_authority": result["appropriate_authority"],
        "citizen_guidance": result["citizen_guidance"]
    })

    return jsonify(result)

@app.route("/complaints", methods=["GET"])
def complaints():

    return jsonify(get_all_complaints())
@app.route("/complaints/<int:complaint_id>/status", methods=["PATCH"])
def update_status(complaint_id):

    data = request.get_json()

    status = data.get("status")

    update_complaint_status(complaint_id, status)

    return jsonify({
        "message": "Status updated successfully"
    })
@app.route("/dashboard", methods=["GET"])
def dashboard():

    return jsonify(get_dashboard_stats())
@app.route("/officer/login", methods=["POST"])
def officer_login():

    data = request.get_json()

    officer_id = data.get("officer_id")
    password = data.get("password")

    if officer_id == "admin" and password == "community123":

        return jsonify({

            "success": True

        })

    return jsonify({

        "success": False,
        "message": "Invalid Officer ID or Password."

    }), 401
if __name__ == "__main__":
    init_db()
    app.run(debug=True)