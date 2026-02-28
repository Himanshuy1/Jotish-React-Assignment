import axios from "axios";

export const fetchEmployees = async () => {
    const res = await axios.post(
        "https://backend.jotish.in/backend_dev/gettabledata.php",
        {
            username: "test",
            password: "123456",
        }
    );

    // The API returns: {"TABLE_DATA": {"data": [["Name", "Position", "City", "ID", "Date", "Salary"], ...]}}
    if (res.data && res.data.TABLE_DATA && res.data.TABLE_DATA.data) {
        return res.data.TABLE_DATA.data.map(emp => ({
            name: emp[0],
            city: emp[2],
            // Normalize salary: remove "$" and "," and convert to number if possible
            salary: emp[5] ? Number(String(emp[5]).replace(/[$,]/g, "")) : 0,
            originalSalary: emp[5] // Keep original for display if needed
        }));
    }

    return [];
};