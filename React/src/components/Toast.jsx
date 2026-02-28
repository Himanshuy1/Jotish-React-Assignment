import { useState, useEffect } from "react";

let toastFunction = null;

export const toast = (message, type = "info") => {
    if (toastFunction) {
        toastFunction(message, type);
    }
};

export function ToastContainer() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        toastFunction = (message, type) => {
            const id = Math.random().toString(36).substr(2, 9);
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 3000);
        };
        return () => {
            toastFunction = null;
        };
    }, []);

    return (
        <div style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>
            {toasts.map((t) => (
                <div key={t.id} style={{
                    background: t.type === "error" ? "#ef4444" : "#10b981",
                    color: "white",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    minWidth: "200px",
                    animation: "fadeIn 0.3s ease-out"
                }}>
                    {t.message}
                </div>
            ))}
        </div>
    );
}
