import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Webcam from "react-webcam";

export default function Details() {
    useEffect(() => {
        document.title = "Employee Details";
    }, []);
    const location = useLocation();
    const employee = location.state;
    const navigate = useNavigate();

    const webcamRef = useRef(null);

    if (!employee) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h3>No employee data found.</h3>
                <button onClick={() => navigate("/list")}>Back to List</button>
            </div>
        );
    }

    const capturePhoto = () => {
        const image = webcamRef.current.getScreenshot();
        navigate("/photo", { state: image });
    };

    return (
        <>
            <Navbar />

            <div style={{ padding: "20px" }}>
                <div
                    style={{
                        background: "var(--card-bg)",
                        padding: "25px",
                        borderRadius: "10px",
                        boxShadow: "var(--shadow)",
                        color: "var(--text-color)",
                    }}
                >
                    <h2>Employee Details</h2>

                    <p><b>Name:</b> {employee.name}</p>
                    <p><b>Salary:</b> {employee.salary}</p>
                    <p><b>City:</b> {employee.city}</p>

                    <h3>Capture Photo</h3>

                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={400}
                    />

                    <br /><br />

                    <button onClick={capturePhoto}>
                        Capture Image
                    </button>
                </div>
            </div>
        </>
    );
}