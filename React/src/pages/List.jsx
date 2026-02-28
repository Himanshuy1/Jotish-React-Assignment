import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { toast } from "../components/Toast";

export default function List() {
    const [employees, setEmployees] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [minSalary, setMinSalary] = useState("");
    const [maxSalary, setMaxSalary] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees()
            .then((res) => {
                // The API service now returns normalized data directly
                setEmployees(res);
                setFiltered(res);
                toast.success("Employees Loaded Successfully");
            })
            .catch(() => toast.error("API Failed"))
            .finally(() => setLoading(false));
    }, []);

    /* FILTERING LOGIC */
    useEffect(() => {
        let result = employees;

        if (search) {
            result = result.filter((emp) =>
                emp.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (minSalary) {
            result = result.filter((emp) => Number(emp.salary) >= Number(minSalary));
        }

        if (maxSalary) {
            result = result.filter((emp) => Number(emp.salary) <= Number(maxSalary));
        }

        setFiltered(result);
    }, [search, minSalary, maxSalary, employees]);

    const handleSearch = (value) => {
        setSearch(value);
    };

    /* DASHBOARD STATS */
    const totalEmployees = employees.length;

    const avgSalary =
        employees.length > 0
            ? employees.reduce((a, b) => a + Number(b.salary || 0), 0) /
            employees.length
            : 0;

    const cities = [...new Set(employees.map((e) => e.city))];

    if (loading) return <Loader />;

    return (
        <>
            <Navbar />

            <div style={{ padding: "20px" }}>
                <h2>Employee Dashboard</h2>

                {/* DASHBOARD CARDS */}
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginBottom: "20px",
                    }}
                >
                    <div className="card">
                        <h3>Total Employees</h3>
                        <p>{totalEmployees}</p>
                    </div>

                    <div className="card">
                        <h3>Average Salary</h3>
                        <p>₹ {avgSalary.toFixed(0)}</p>
                    </div>

                    <div className="card">
                        <h3>Cities</h3>
                        <p>{cities.length}</p>
                    </div>
                </div>

                {/* FILTERS */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                    <input
                        placeholder="Search Employee..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Min Salary"
                        value={minSalary}
                        onChange={(e) => setMinSalary(e.target.value)}
                        style={{ width: "120px" }}
                    />

                    <input
                        type="number"
                        placeholder="Max Salary"
                        value={maxSalary}
                        onChange={(e) => setMaxSalary(e.target.value)}
                        style={{ width: "120px" }}
                    />

                    <button onClick={() => { setSearch(""); setMinSalary(""); setMaxSalary(""); }}>
                        Clear
                    </button>
                </div>

                <br />

                <button onClick={() => navigate("/chart")}>
                    Salary Chart
                </button>

                <button onClick={() => navigate("/map")}>
                    City Map
                </button>

                {/* TABLE */}
                {filtered.length === 0 ? (
                    <h3>No Employees Found</h3>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Salary</th>
                                <th>City</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((emp, index) => (
                                <tr
                                    key={index}
                                    onClick={() =>
                                        navigate(`/details/${index}`, {
                                            state: emp,
                                        })
                                    }
                                >
                                    <td>{emp.name}</td>
                                    <td>{emp.salary}</td>
                                    <td>{emp.city}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}