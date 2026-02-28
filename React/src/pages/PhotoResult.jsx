import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PhotoResult() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                }}
            >
                <div
                    style={{
                        background: "var(--card-bg)",
                        padding: "30px",
                        borderRadius: "10px",
                        boxShadow: "var(--shadow)",
                        textAlign: "center",
                        color: "var(--text-color)",
                    }}
                >
                    <h2>Captured Photo</h2>

                    {location.state ? (
                        <>
                            <img
                                src={location.state}
                                alt="Captured"
                                width="400"
                            />
                            <br /><br />
                            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                <button onClick={() => {
                                    const link = document.createElement("a");
                                    link.href = location.state;
                                    link.download = "captured-photo.png";
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}>
                                    Download Image
                                </button>
                                <button
                                    onClick={() => navigate("/list")}
                                    style={{ background: "#6b7280" }}
                                >
                                    Back to List
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>No photo captured.</p>
                            <button onClick={() => navigate("/list")}>
                                Back to List
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}