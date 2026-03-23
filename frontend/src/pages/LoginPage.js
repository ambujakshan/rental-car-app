import React, { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__copy">
          <p className="eyebrow">Admin access</p>
          <h2>Rental Car Login</h2>
          <p>Sign in to manage cars, customers, and bookings from the dashboard.</p>
        </div>
        <form onSubmit={handleLogin} className="cars-form">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit" className="primary-button">Login</button>
        </form>
        <Link to="/" className="login-back">Back to website</Link>
      </div>
    </div>
  );
}
