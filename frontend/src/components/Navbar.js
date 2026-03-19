import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/dashboard" style={{ color: "#fff", marginRight: "15px" }}>Dashboard</Link>
      <Link to="/cars" style={{ color: "#fff", marginRight: "15px" }}>Cars</Link>
      <Link to="/customers" style={{ color: "#fff", marginRight: "15px" }}>Customers</Link>
      <Link to="/bookings" style={{ color: "#fff", marginRight: "15px" }}>Bookings</Link>
      <button onClick={logout} style={{ float: "right" }}>Logout</button>
    </div>
  );
}