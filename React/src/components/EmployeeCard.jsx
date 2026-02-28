export default function EmployeeCard({ employee, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                border: "1px solid var(--table-border)",
                borderRadius: "8px",
                padding: "1rem",
                margin: "0.5rem",
                cursor: "pointer",
                boxShadow: "var(--shadow)",
                transition: "transform 0.2s, background 0.3s",
                width: "200px",
                background: "var(--card-bg)",
                color: "var(--text-color)"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
            <h3 style={{ margin: "0 0 0.5rem 0" }}>{employee.name}</h3>
            <p style={{ margin: "0.2rem 0" }}>Salary: {employee.originalSalary || employee.salary}</p>
            <p style={{ margin: "0.2rem 0", opacity: 0.7 }}>City: {employee.city}</p>
        </div>
    );
}
