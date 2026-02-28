import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import {
    Bar
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    BarController,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    BarController,
    Tooltip,
    Legend
);

export default function BarChartPage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        setLoading(true);
        fetchEmployees().then((data) => {
            // Sort by salary descending and take top 10
            const sortedData = [...data]
                .sort((a, b) => b.salary - a.salary)
                .slice(0, 10);
            setEmployees(sortedData);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return (
        <>
            <Navbar />
            <div style={{ padding: "40px", textAlign: "center", color: "var(--text-color)" }}>
                <div className="spinner"></div>
                <p>Loading chart data...</p>
            </div>
        </>
    );

    const isDark = theme === "dark";
    const textColor = isDark ? "#f9fafb" : "#1f2937";
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)";

    const data = {
        labels: employees.map((e) => e.name),
        datasets: [
            {
                label: "Salary",
                data: employees.map((e) => e.salary),
                backgroundColor: isDark ? "rgba(129, 140, 248, 0.8)" : "rgba(37, 99, 235, 0.8)",
                borderColor: isDark ? "#818cf8" : "#2563eb",
                borderWidth: 1,
                borderRadius: 8,
                hoverBackgroundColor: isDark ? "#a5b4fc" : "#1d4ed8",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                    font: { size: 14, weight: '600' }
                }
            },
            tooltip: {
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                titleColor: isDark ? "#ffffff" : "#1f2937",
                bodyColor: isDark ? "#e5e7eb" : "#4b5563",
                borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: false
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: textColor, font: { size: 12 } }
            },
            y: {
                grid: { color: gridColor },
                ticks: {
                    color: textColor,
                    font: { size: 12 },
                    callback: (value) => "$" + value.toLocaleString()
                }
            }
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "var(--bg-color)", transition: "background 0.3s" }}>
            <Navbar />
            <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
                <div className="card" style={{ padding: "30px" }}>
                    <h2 style={{ marginBottom: "30px", textAlign: "center", color: "var(--text-color)" }}>
                        Top 10 Salaries Analysis
                    </h2>
                    <div style={{ height: "450px" }}>
                        <Bar data={data} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
}
