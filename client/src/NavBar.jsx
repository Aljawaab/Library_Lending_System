import React from "react";
import { NavLink } from "react-router-dom";


const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">Home Page</NavLink>
      <NavLink to="/borrowing-form" className="nav-link">Borrowing Form</NavLink>
      <NavLink to="/student-form" className="nav-link">Student Form</NavLink>
      <NavLink to="/add-new-book" className="nav-link">Add New Book</NavLink>
      <NavLink to="/borrowing-records" className="nav-link">Borrowing Records</NavLink>
    </nav>
  );
};

export default NavBar;
