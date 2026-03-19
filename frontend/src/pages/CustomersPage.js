import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    license_no: "",
    address: ""
  });

  const loadCustomers = async () => {
    const res = await API.get("/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const saveCustomer = async (e) => {
    e.preventDefault();
    await API.post("/customers", form);
    setForm({ full_name: "", phone: "", email: "", license_no: "", address: "" });
    loadCustomers();
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Customers</h2>
        <form onSubmit={saveCustomer}>
          <input placeholder="Full Name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="License No" value={form.license_no} onChange={(e) => setForm({ ...form, license_no: e.target.value })} />
          <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <button type="submit">Add Customer</button>
        </form>

        <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>License</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.full_name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.license_no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}