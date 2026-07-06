import requests

def reverse_geocode(latitude, longitude):

    print(f"Reverse geocoding: {latitude}, {longitude}")

    if latitude is None or longitude is None:
        return "Location unavailable"

    try:

        response = requests.get(
            "https://nominatim.openstreetmap.org/reverse",
            params={
                "lat": latitude,
                "lon": longitude,
                "format": "jsonv2"
            },
            headers={
                "User-Agent": "CommunityComplaintPlatform/1.0"
            },
            timeout=10
        )


        if response.status_code == 429:
            print("Rate limited by Nominatim.")
            return None

        if response.status_code != 200:
            return None

        data = response.json()


        return data.get("display_name")

    except Exception as e:

        print("Reverse geocoding error:", e)

        return None