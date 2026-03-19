import React from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Rental Car Dashboard</h2>
        <p>Manage cars, customers, and bookings.</p>
      </div>
    </div>
  );
}