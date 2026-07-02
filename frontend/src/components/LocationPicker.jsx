import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ location, onLocationSelect }) {

    const map = useMap();

    useMapEvents({

        click(e) {

            onLocationSelect(e.latlng);

        }

    });

    useEffect(() => {

        if (location) {

            map.flyTo(location, 16, {

                animate: true

            });

        }

    }, [location, map]);

    return location ? <Marker position={location} /> : null;

}

export default function LocationPicker({

    location,
    onLocationSelect

}) {

    return (

        <MapContainer
            center={[20.2961, 85.8245]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-80 w-full rounded-2xl"
        >

            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker

                location={location}

                onLocationSelect={onLocationSelect}

            />

        </MapContainer>

    );

}