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

  const withEmail = customers.filter((customer) => customer.email).length;
  const withPhone = customers.filter((customer) => customer.phone).length;

  return (
    <div className="app-shell">
      <Navbar />
      <main className="cars-page">
        <section className="cars-hero">
          <div>
            <p className="eyebrow">Customer records</p>
            <h1>Customer listing</h1>
            <p className="cars-hero__text">
              Store renter details in one place so contact information and license
              records stay easy to review before every booking.
            </p>
          </div>
          <div className="cars-stats">
            <div className="stat-card">
              <span className="stat-card__label">Total customers</span>
              <strong>{customers.length}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">With phone</span>
              <strong>{withPhone}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">With email</span>
              <strong>{withEmail}</strong>
            </div>
          </div>
        </section>

        <section className="cars-layout">
          <div className="panel panel--form">
            <div className="panel__header">
              <h2>Add a customer</h2>
              <p>Capture core renter details for faster booking creation.</p>
            </div>

            <form className="cars-form" onSubmit={saveCustomer}>
              <input
                placeholder="Full Name"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                placeholder="License No"
                value={form.license_no}
                onChange={(e) => setForm({ ...form, license_no: e.target.value })}
              />
              <input
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              <button type="submit" className="primary-button">Add Customer</button>
            </form>
          </div>

          <div className="panel">
            <div className="panel__header">
              <h2>Customer overview</h2>
              <p>{customers.length} renters currently stored in the system.</p>
            </div>

            <div className="cars-table-wrapper">
              <table className="cars-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>License</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.length > 0 ? (
                    customers.map((customer) => (
                      <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.full_name}</td>
                        <td>{customer.phone || "Not added"}</td>
                        <td>{customer.email || "Not added"}</td>
                        <td>{customer.license_no || "Not added"}</td>
                        <td>{customer.address || "Not added"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="cars-table__empty">
                        No customers added yet. Use the form to create the first profile.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
