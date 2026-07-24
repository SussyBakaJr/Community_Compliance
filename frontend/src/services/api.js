const API_URL = "http://127.0.0.1:5000";

export async function analyzeComplaint(
    complaint,
    image,
    location
) {

    const formData = new FormData();
    if (!complaint.trim() && !image) {
    alert("Please enter a complaint or upload an image.");
    return;
}

    if (!location) {
    alert("Please select a complaint location on the map or use your current location.");
    return;
}
    formData.append("complaint", complaint);
    formData.append("latitude", location.lat);
    formData.append("longitude", location.lng);

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
export async function updateComplaintStatus(id, status, remarks) {

    const response = await fetch(
        `${API_URL}/complaints/${id}/status`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                status,
                remarks
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update status");
    }

    return await response.json();
}
export async function submitComplaint(data) {

    const response = await fetch(`${API_URL}/submit`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(data)

    });

    return response.json();

}
export async function registerUser(name, email, password) {

    const response = await fetch(`${API_URL}/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email,
            password
        })

    });

    return await response.json();

}

export async function loginUser(email, password) {

    const response = await fetch(`${API_URL}/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    });

    return await response.json();

}