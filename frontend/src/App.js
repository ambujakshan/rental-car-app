import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CarsPage from "./pages/CarsPage";
import CustomersPage from "./pages/CustomersPage";
import BookingsPage from "./pages/BookingsPage";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/cars" element={<PrivateRoute><CarsPage /></PrivateRoute>} />
        <Route path="/customers" element={<PrivateRoute><CustomersPage /></PrivateRoute>} />
        <Route path="/bookings" element={<PrivateRoute><BookingsPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}