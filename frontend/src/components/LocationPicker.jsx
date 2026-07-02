import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ onLocationSelect }) {

    const [position, setPosition] = useState(null);

    useMapEvents({

        click(e) {

            setPosition(e.latlng);

            onLocationSelect(e.latlng);

        }

    });

    return position ? <Marker position={position} /> : null;

}

export default function LocationPicker({ onLocationSelect }) {

    return (

        <MapContainer
            center={[20.2961, 85.8245]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-80 w-full rounded-2xl"
        >

            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker
                onLocationSelect={onLocationSelect}
            />

        </MapContainer>

    );

}