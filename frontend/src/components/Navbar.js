import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="topbar">
      <div className="topbar__brand">DriveDesk</div>
      <div className="topbar__links">
        <Link to="/dashboard" className="topbar__link">Dashboard</Link>
        <Link to="/cars" className="topbar__link">Cars</Link>
        <Link to="/customers" className="topbar__link">Customers</Link>
        <Link to="/bookings" className="topbar__link">Bookings</Link>
      </div>
      <button onClick={logout} className="topbar__button">Logout</button>
    </nav>
  );
}
