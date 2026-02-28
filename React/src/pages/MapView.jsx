import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Navbar from "../components/Navbar";
import { fetchEmployees } from "../services/api";

const CITY_COORDINATES = {
    "Edinburgh": [55.9533, -3.1883],
    "Tokyo": [35.6762, 139.6503],
    "San Francisco": [37.7749, -122.4194],
    "Sidney": [-33.8688, 151.2093],
    "Singapore": [1.3521, 103.8198],
    "Mumbai": [19.0760, 72.8777],
    "Delhi": [28.7041, 77.1025],
    "Pune": [18.5204, 73.8567],
    "London": [51.5074, -0.1278],
    "New York": [40.7128, -74.0060]
};

export default function MapView() {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        fetchEmployees().then(data => {
            const uniqueCities = [...new Set(data.map(emp => emp.city))];
            const mappedMarkers = uniqueCities
                .map(city => ({
                    name: city,
                    pos: CITY_COORDINATES[city]
                }))
                .filter(m => m.pos); // Only keep cities we have coordinates for
            setMarkers(mappedMarkers);
        });
    }, []);

    return (
        <>
            <Navbar />
            <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: "calc(100vh - 60px)", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {markers.map((marker, i) => (
                    <Marker key={i} position={marker.pos}>
                        <Popup>{marker.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </>
    );
}
