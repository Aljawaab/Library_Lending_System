import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import LendingForm from "./pages/LendingForm";
import AddNewBook from "./pages/AddNewBook";
import BorrowingRecords from "./pages/BorrowingRecord";
import StudentForm from "./pages/StudentForm";
import "./App.css";

const App = () => {
  return (
      <Router>
        <div className="app">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/borrowing-form" element={<LendingForm />} />
            <Route path="/student-form" element={<StudentForm />} />
            <Route path="/add-new-book" element={<AddNewBook />} />
            <Route path="/borrowing-records" element={<BorrowingRecords />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
