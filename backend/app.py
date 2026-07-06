from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import send_from_directory
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
    import os
    from werkzeug.utils import secure_filename

    UPLOAD_FOLDER = "uploads"

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    image_name = None

    if image and image.filename != "":

        image_name = secure_filename(image.filename)

        image.save(os.path.join(UPLOAD_FOLDER, image_name))


    result = analyze_complaint(complaint, image)
    if latitude and longitude:
        address = reverse_geocode(latitude, longitude)
    else:
        address = None
    

    return jsonify({

        "analysis": result,

        "complaint": complaint,

        "latitude": latitude,

        "longitude": longitude,

        "address": address,

        "image_name": image_name

    })
@app.route("/submit", methods=["POST"])
def submit():

    data = request.get_json()

    save_complaint(data)

    return jsonify({

        "success": True,
        "message": "Complaint submitted successfully."

    })
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
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory("uploads", filename)
if __name__ == "__main__":
    init_db()
    app.run()