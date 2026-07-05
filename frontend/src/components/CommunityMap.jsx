import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import { getComplaints } from "../services/api";

import redMarker from "../assets/markers/marker-red.png";
import yellowMarker from "../assets/markers/marker-yellow.png";
import greenMarker from "../assets/markers/marker-green.png";

const redIcon = new L.Icon({
    iconUrl: redMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

const yellowIcon = new L.Icon({
    iconUrl: yellowMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

const greenIcon = new L.Icon({
    iconUrl: greenMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

function getMarkerIcon(priority) {

    switch (priority) {

        case "Critical":
        case "High":
            return redIcon;

        case "Medium":
            return yellowIcon;

        default:
            return greenIcon;

    }

}

export default function CommunityMap() {

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {

        async function loadComplaints() {

            try {

                const data = await getComplaints();
                setComplaints(data);

            } catch (error) {

                console.error(error);

            }

        }

        loadComplaints();

    }, []);

    return (

        <div className="rounded-3xl overflow-hidden border border-slate-800">

            <MapContainer
                center={[20.2961, 85.8245]}
                zoom={13}
                className="h-[500px] w-full"
            >

                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {complaints.map((complaint) => {

                    if (!complaint.latitude || !complaint.longitude) {

                        return null;

                    }

                    return (

                        <Marker
                            key={complaint.id}
                            icon={getMarkerIcon(complaint.priority)}
                            position={[
                                Number(complaint.latitude),
                                Number(complaint.longitude)
                            ]}
                        >

                            <Popup>

                                <h3 className="font-bold">

                                    {complaint.category}

                                </h3>

                                <p>

                                    <strong>Priority:</strong>{" "}
                                    {complaint.priority}

                                </p>

                                <p>

                                    {complaint.summary}

                                </p>

                                <p>

                                    <strong>Department:</strong>{" "}
                                    {complaint.department}

                                </p>

                                <p>

                                    <strong>Status:</strong>{" "}
                                    {complaint.status}

                                </p>

                            </Popup>

                        </Marker>

                    );

                })}

            </MapContainer>

        </div>

    );

}