import { useState } from "react";
import { analyzeComplaint } from "../services/api";
import LocationPicker from "../components/LocationPicker";
export default function ReportComplaint() {

    const [complaint, setComplaint] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    function getCurrentLocation() {

    if (!navigator.geolocation) {

        alert("Geolocation is not supported by your browser.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        (position) => {

            setLocation({

                lat: position.coords.latitude,
                lng: position.coords.longitude

            });

        },

        () => {

            alert("Unable to retrieve your location.");

        }

    );

}
    async function handleAnalyze() {

        if (!complaint.trim() && !image) {
            alert("Please enter a complaint or upload an image.");
            return;
        }

        try {

            setLoading(true);
            setError("");
            setResult(null);

            const response = await analyzeComplaint(
    complaint,
    image,
    location
);


            setResult(response);

        } catch (err) {

            console.error(err);
            setError("Failed to connect to AI.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <main className="min-h-screen bg-slate-950 text-white pt-32">

            <div className="max-w-5xl mx-auto px-8">

                <h1 className="text-5xl font-bold">

                    Report a Community Complaint

                </h1>

                <p className="text-slate-400 mt-4">

                    Describe the issue and let AI analyze it.

                </p>

                <textarea

                    value={complaint}

                    onChange={(e) => setComplaint(e.target.value)}

                    placeholder="Example: Large pothole near KIIT Gate 2 causing accidents..."

                    className="w-full h-44 mt-10 rounded-2xl bg-slate-900 border border-slate-700 p-6 outline-none"

                />
                <div className="mt-6">

    <label className="block mb-2 text-slate-300">
        Upload an image (optional)
    </label>

    <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="block w-full text-slate-300"
    />

</div>
<div className="mt-8">

    <h3 className="text-xl font-semibold mb-4">

        Select Complaint Location

    </h3>
    <button

    onClick={getCurrentLocation}

    className="mb-4 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition"

>

    📍 Use My Current Location

</button>

    <LocationPicker
        location={location}
        onLocationSelect={setLocation}
    />

    {location && (

        <div className="mt-4 text-slate-300">

            <p>
                Latitude: {location.lat.toFixed(6)}
            </p>

            <p>
                Longitude: {location.lng.toFixed(6)}
            </p>

        </div>

    )}

</div>
                <button

                    onClick={handleAnalyze}

                    disabled={loading}

                    className="mt-8 bg-violet-600 hover:bg-violet-700 px-8 py-4 rounded-xl"

                >

                    {loading ? "Analyzing..." : "Analyze Complaint"}

                </button>

                {error && (

                    <p className="text-red-400 mt-6">

                        {error}

                    </p>

                )}

                {result && (

                    <div className="mt-10 rounded-3xl bg-slate-900 border border-slate-800 p-8">

                        <h2 className="text-3xl font-bold mb-6">

                            AI Analysis

                        </h2>

                        <div className="space-y-4">

                            <p><strong>Category:</strong> {result.category}</p>

                            <p><strong>Priority:</strong> {result.priority}</p>

                            <p><strong>Municipal Responsibility:</strong>{" "}{result.municipal_responsibility ? "✅ Yes" : "❌ No"}</p>

                            <p><strong>Responsible Authority:</strong>{" "}{result.appropriate_authority}</p>

                            <p><strong>Summary:</strong> {result.summary}</p>
                            <p><strong>Citizen Guidance:</strong>{" "}{result.citizen_guidance}</p>

                            <p><strong>Recommended Action:</strong> {result.recommended_action}</p>
                            <p><strong>Estimated Response:</strong> {result.estimated_response_time}</p>

                            <p><strong>Confidence:</strong> {result.confidence}</p>

                            


                            

                        </div>

                    </div>

                )}

            </div>

        </main>

    );

}