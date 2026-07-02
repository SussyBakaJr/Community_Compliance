const API_URL = "http://127.0.0.1:5000";

export async function analyzeComplaint(complaint) {

    const response = await fetch(`${API_URL}/analyze`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            complaint
        })

    });

    if (!response.ok) {
        throw new Error("Failed to analyze complaint");
    }

    return await response.json();

}