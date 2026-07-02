from flask import Flask, request, jsonify
from flask_cors import CORS

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
    save_complaint({

        "complaint": complaint,
        "latitude": latitude,
        "longitude": longitude,
        "image_name": image.filename if image else None,
        "category": result["category"],
        "priority": result["priority"],
        "department": result["department"],
        "summary": result["summary"],
        "confidence": result["confidence"],
        "estimated_response_time": result["estimated_response_time"],
        "recommended_action": result["recommended_action"]
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
if __name__ == "__main__":
    init_db()
    app.run(debug=True)