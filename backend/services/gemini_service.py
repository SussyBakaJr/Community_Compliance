import os
import json
from dotenv import load_dotenv
import google.generativeai as genai
from PIL import Image
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_complaint(text, image_file=None):

    prompt = f"""
You are an AI assistant for a community complaint platform.

Analyze this complaint.

Return ONLY valid JSON.

Do not use markdown.
Do not wrap the response in ```json.
Do not include explanations.
Return exactly one JSON object.

Complaint text (may be empty if only an image was uploaded):
{text}

If an image is provided, analyze the visible issue as well. Use both the text and the image together. If only the image is provided, infer the complaint from the image.

Return exactly this format:

{{
  "category": "",
  "priority": "",
  "department": "",
  "summary": "",
  "confidence": "",
  "estimated_response_time": "",
  "recommended_action": ""
}}
"""

    if image_file:
        # Open the image using PIL
        image = Image.open(image_file)

        response = model.generate_content([
            prompt,
            image
        ])
    else:
        response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    elif text.startswith("```"):
        text = text.replace("```", "").strip()

    return json.loads(text)