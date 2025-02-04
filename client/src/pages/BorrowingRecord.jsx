import React, { useState, useEffect } from "react";
import axios from "axios";

const BorrowingRecords = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(null);

  // Fetch Lending Records
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = () => {
    axios
      .get("https://library-lending-system-db.onrender.com/lendings")
      .then((response) => {
        setRecords(response.data.data);
      })
      .catch((error) => console.error("Error fetching records:", error));
  };

  // Handle Search
  const handleSearch = () => {
    if (!search) {
      alert("Please enter a Lending ID to search.");
      return;
    }

    axios
      .get(`https://library-lending-system-db.onrender.com/lendings/${search}`)
      .then((response) => {
        setRecords([response.data.data]);
      })
      .catch(() => alert("Lending record not found!"));
  };

  // Reset Search
  const handleResetSearch = () => {
    setSearch("");
    fetchRecords();
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lending record?")) return;
    setLoading(id); // Set loading state for this row

    try {
      await axios.delete(`https://library-lending-system-db.onrender.com/lendings/${id}`);
      setRecords(records.filter((record) => record.id !== id));
      alert("Lending record deleted successfully!");
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record.");
    } finally {
      setLoading(null); // Reset loading state
    }
  };

  return (
    <div className="borrowing-records">
      <h2>Borrowing Records</h2>
      <div>
        <input
          type="number"
          placeholder="Search Lending ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleResetSearch}>Reset Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Lending ID</th>
            <th>Book ID</th>
            <th>Author</th>
            <th>Title</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Student ID</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record["Student Name"]}</td>
              <td>{record["Lending ID"]}</td>
              <td>{record["Book ID"]}</td>
              <td>{record.Author}</td>
              <td>{record["Book Title"]}</td>
              <td>{record.BorrowDate}</td>
              <td>{record.ReturnDate}</td>
              <td>{record["Student ID"]}</td>
              <td>
                <button
                  onClick={() => handleDelete(record.id)}
                  disabled={loading === record.id}
                >
                  {loading === record.id ? "Deleting..." : "Delete"}
                </button>
              </td>
              <td>
                <button >Update</button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingRecords;
