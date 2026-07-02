const API_URL = "http://127.0.0.1:5000";

export async function analyzeComplaint(complaint, image) {

    const formData = new FormData();

    formData.append("complaint", complaint);

    if (image) {
        formData.append("image", image);
    }

    const response = await fetch(`${API_URL}/analyze`, {

        method: "POST",

        body: formData

    });

    if (!response.ok) {
        throw new Error("Failed to analyze complaint");
    }

    return await response.json();

}
export async function getDashboardData() {

    const response = await fetch(`${API_URL}/dashboard`);

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
    }

    return await response.json();

}

export async function getComplaints() {

    const response = await fetch(`${API_URL}/complaints`);

    if (!response.ok) {
        throw new Error("Failed to fetch complaints");
    }

    return await response.json();

}