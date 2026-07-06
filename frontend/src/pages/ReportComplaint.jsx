import { useState } from "react";
import { analyzeComplaint, submitComplaint } from "../services/api";
import LocationPicker from "../components/LocationPicker";
import { useNavigate } from "react-router-dom";

export default function ReportComplaint() {
    const [loading, setLoading] = useState(false);
    const [complaint, setComplaint] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const navigate = useNavigate();
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
    async function handleSubmit() {

    try {

        await submitComplaint({

            complaint: result.complaint,
            latitude: result.latitude,
            longitude: result.longitude,
            address: result.address,
            image_name: result.image_name,

            category: result.analysis.category,
            priority: result.analysis.priority,
            department: result.analysis.department,
            summary: result.analysis.summary,
            confidence: result.analysis.confidence,
            estimated_response_time:
                result.analysis.estimated_response_time,
            recommended_action:
                result.analysis.recommended_action,
            municipal_responsibility:
                result.analysis.municipal_responsibility,
            appropriate_authority:
                result.analysis.appropriate_authority,
            citizen_guidance:
                result.analysis.citizen_guidance

        });

        alert("Complaint submitted successfully!");
        navigate("/history");
        setComplaint("");
        setImage(null);
        setLocation(null);
        setResult(null);

    } catch (err) {

        console.error(err);

        alert("Submission failed.");

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
                {result && (

    <button
        onClick={handleSubmit}
        className="ml-4 mt-8 rounded-xl bg-green-600 px-8 py-4 hover:bg-green-700"

    >

        Submit Complaint

    </button>

)}

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

                            <p><strong>Category:</strong> {result.analysis.category}</p>

                            <p><strong>Priority:</strong> {result.analysis.priority}</p>

                            <p><strong>Municipal Responsibility:</strong>{" "}{result.analysis.municipal_responsibility ? "✅ Yes" : "❌ No"}</p>

                            <p><strong>Responsible Authority:</strong>{" "}{result.analysis.appropriate_authority}</p>

                            <p><strong>Summary:</strong> {result.analysis.summary}</p>
                            <p><strong>Citizen Guidance:</strong>{" "}{result.analysis.citizen_guidance}</p>

                            <p><strong>Recommended Action:</strong> {result.analysis.recommended_action}</p>
                            <p><strong>Estimated Response:</strong> {result.analysis.estimated_response_time}</p>

                            <p><strong>Confidence:</strong> {result.analysis.confidence}</p>

                            


                            

                        </div>

                    </div>

                )}

            </div>

        </main>

    );

}