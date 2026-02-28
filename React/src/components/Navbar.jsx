import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const logout = () => {
        localStorage.removeItem("auth");
        navigate("/");
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "10px 20px",
                gap: "10px"
            }}
        >
            <button onClick={toggleTheme}>
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
            <div>
                <button onClick={() => navigate("/list")}>
                    Home
                </button>

                <button
                    onClick={logout}
                    style={{ background: "#dc2626" }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}