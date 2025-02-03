import React, { useState, useEffect } from "react";
import axios from "axios";

const BorrowingRecords = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [editableRecords, setEditableRecords] = useState({}); // Track edited BorrowDate & ReturnDate
  const [loading, setLoading] = useState(null); // Track which row is loading

  // Fetch Lending Records
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = () => {
    axios
      .get("http://127.0.0.1:5555/lendings")
      .then((response) => {
        setRecords(response.data.data);

        // Pre-fill BorrowDate & ReturnDate
        const prefilledRecords = response.data.data.reduce((acc, record) => {
          acc[record.id] = {
            BorrowDate: record.BorrowDate,
            ReturnDate: record.ReturnDate,
          };
          return acc;
        }, {});

        setEditableRecords(prefilledRecords);
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
      .get(`http://127.0.0.1:5555/lendings/${search}`)
      .then((response) => {
        setRecords([response.data.data]);
        setEditableRecords({ [response.data.data.id]: response.data.data });
      })
      .catch(() => alert("Student not found!"));
  };

  // Reset Search
  const handleResetSearch = () => {
    setSearch("");
    fetchRecords();
  };

  // Handle BorrowDate & ReturnDate Edit
  const handleEdit = (id, field, value) => {
    setEditableRecords({
      ...editableRecords,
      [id]: { ...editableRecords[id], [field]: value },
    });
  };

  // Handle Update
  const handleUpdate = async (id) => {
    setLoading(id); // Set loading state for this row
    const updatedRecord = {
      BorrowDate: editableRecords[id].BorrowDate,
      ReturnDate: editableRecords[id].ReturnDate,
    };

    try {
      await axios.patch(`http://127.0.0.1:5555/lendings/${id}`, updatedRecord);
      setRecords(
        records.map((record) =>
          record.id === id ? { ...record, ...updatedRecord } : record
        )
      );
      alert("Record updated successfully!");
    } catch (error) {
      console.error("Error updating record:", error);
      alert("Failed to update record.");
    } finally {
      setLoading(null); // Reset loading state
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lending and related data?"))
      return;
    setLoading(id); // Set loading state for this row

    try {
      await axios.delete(`http://127.0.0.1:5555/lendings/${id}`);
      setRecords(records.filter((record) => record.id !== id));
      const newEditableRecords = { ...editableRecords };
      delete newEditableRecords[id];
      setEditableRecords(newEditableRecords);
      alert("Lending deleted successfully!");
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
          placeholder="Search Student by Lending ID"
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
              <td>
                <input
                  type="text"
                  value={editableRecords[record.id]?.BorrowDate || ""}
                  onChange={(e) =>
                    handleEdit(record.id, "BorrowDate", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editableRecords[record.id]?.ReturnDate || ""}
                  onChange={(e) =>
                    handleEdit(record.id, "ReturnDate", e.target.value)
                  }
                />
              </td>
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
                <button
                  onClick={() => handleUpdate(record.id)}
                  disabled={loading === record.id}
                >
                  {loading === record.id ? "Updating..." : "Update"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingRecords;