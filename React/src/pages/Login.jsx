import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === "testuser" && password === "Test123") {
            localStorage.setItem("auth", true);
            navigate("/list");
        } else {
            setError("Invalid Username or Password");
        }
    };

    return (
        <div className="login-bg">
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome</h1>
                    <p>Enter your credentials to access the portal</p>
                </div>

                <div className="premium-input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="premium-input"
                        placeholder="john.doe"
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    />
                </div>

                <div className="premium-input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="premium-input"
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    />
                </div>

                <button className="login-btn" onClick={handleLogin}>
                    Sign In
                </button>

                {error && <div className="error-msg">{error}</div>}
            </div>
        </div>
    );
}
