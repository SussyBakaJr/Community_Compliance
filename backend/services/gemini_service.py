import os
import json
from pydoc import text
from dotenv import load_dotenv
import google.generativeai as genai
from PIL import Image
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_complaint(text, image_file=None):

    prompt = f"""
You are an intelligent AI assistant for a Smart Community Complaint Platform.

Your task is to analyze complaints submitted through text and/or images and determine the most appropriate authority to handle them.

Analyze the complaint and determine:

• Whether it is a valid civic/community complaint.
• The complaint category.
• The priority level (Low, Medium, High, Critical).
• The most appropriate responsible authority.
• Whether the issue falls within the scope of the municipal corporation.
• Practical guidance for the citizen.
• A recommended next action.

IMPORTANT DEFINITIONS

A complaint is considered under MUNICIPAL RESPONSIBILITY only if it is normally handled by the city or municipal corporation, including examples such as:

- Road maintenance
- Potholes
- Street lights
- Garbage collection
- Drainage
- Public sanitation
- Public parks
- Civic infrastructure
- Municipal water supply (where applicable)

A complaint is NOT under municipal responsibility if it is primarily handled by:

- Local Police
- Emergency Services
- Fire Department
- Courts
- Private disputes
- Housing Society / Apartment Association
- Private Property Owner
- Electricity Distribution Company
- Internet Service Provider
- Banks
- Schools
- Hospitals (unless specifically municipal)

If another authority is more appropriate, set:

"municipal_responsibility": false

and specify that authority.

PERSONAL DISPUTES

If the complaint is purely personal (for example roommate arguments, family disagreements, relationship issues, personal property disputes), then:

- Set is_valid_complaint to false.
- Set municipal_responsibility to false.
- Set department to "None".
- Recommend communication, mediation, or another appropriate authority if applicable.

EXCEPTION

If a personal dispute describes:

- violence
- assault
- domestic abuse
- threats
- weapons
- stalking
- kidnapping
- immediate danger

then it IS a valid complaint.

Set:

- priority = "Critical"
- appropriate_authority = "Local Police / Emergency Services"
- municipal_responsibility = false

Provide emergency guidance advising the user to immediately contact local emergency services rather than waiting for complaint processing.

GENERAL RULES

Do not invent laws.

Do not provide legal advice.

If regulations vary by country, state, or city, clearly state that procedures may vary by jurisdiction.

Do not force every complaint into a municipal department.

Complaint text (may be empty if only an image was uploaded):

{text}

If an image is provided, analyze both the text and image together.
If only an image is provided, infer the complaint from the image.

Return ONLY valid JSON.

Do not use markdown.

Return exactly one JSON object in this format:

{{
  "is_valid_complaint": true,
  "category": "",
  "priority": "",
  "department": "",
  "summary": "",
  "confidence": "",
  "estimated_response_time": "",
  "recommended_action": "",
  "municipal_responsibility": true,
  "appropriate_authority": "",
  "citizen_guidance": ""
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

    print("Gemini raw response:")
    print(text)

    return json.loads(text)