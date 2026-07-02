import { useState } from "react";
import { analyzeComplaint } from "../services/api";

export default function ReportComplaint() {

    const [complaint, setComplaint] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    async function handleAnalyze() {

        if (!complaint.trim()) {
            alert("Please enter a complaint.");
            return;
        }

        try {

            setLoading(true);
            setError("");
            setResult(null);

            const response = await analyzeComplaint(complaint);

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

                            <p><strong>Department:</strong> {result.department}</p>

                            <p><strong>Summary:</strong> {result.summary}</p>

                            <p><strong>Confidence:</strong> {result.confidence}</p>

                            <p><strong>Estimated Response:</strong> {result.estimated_response_time}</p>

                            <p><strong>Recommended Action:</strong> {result.recommended_action}</p>

                        </div>

                    </div>

                )}

            </div>

        </main>

    );

}