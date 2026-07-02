from flask import Flask, request, jsonify
from flask_cors import CORS

from services.gemini_service import analyze_complaint

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return {"message": "Backend running"}


@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.get_json()

    complaint = data.get("complaint", "")

    result = analyze_complaint(complaint)

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)