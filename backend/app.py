from flask import Flask, request, jsonify
from flask_cors import CORS

from services.gemini_service import analyze_complaint
from database.database import (
    init_db,
    save_complaint,
    get_all_complaints,
    get_dashboard_stats
)

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return {"message": "Backend running"}


@app.route("/analyze", methods=["POST"])
@app.route("/complaints", methods=["GET"])
def complaints():

    return jsonify(get_all_complaints())
@app.route("/dashboard", methods=["GET"])
def dashboard():

    return jsonify(get_dashboard_stats())
def analyze():

    complaint = request.form.get("complaint", "")

    image = request.files.get("image")

    print("Complaint:", complaint)

    if image:
        print("Image received:", image.filename)
    else:
        print("No image uploaded.")

    result = analyze_complaint(complaint, image)
    save_complaint({

        "complaint": complaint,
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


if __name__ == "__main__":
    init_db()
    app.run(debug=True)