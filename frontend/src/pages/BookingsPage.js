import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    car_id: "",
    customer_id: "",
    pickup_date: "",
    return_date: "",
    rate_per_day: "",
    booking_status: "booked",
    payment_status: "pending",
    notes: ""
  });

  const loadData = async () => {
    const bookingsRes = await API.get("/bookings");
    const carsRes = await API.get("/cars/available");
    const customersRes = await API.get("/customers");

    setBookings(bookingsRes.data);
    setCars(carsRes.data);
    setCustomers(customersRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveBooking = async (e) => {
    e.preventDefault();
    await API.post("/bookings", form);
    setForm({
      car_id: "",
      customer_id: "",
      pickup_date: "",
      return_date: "",
      rate_per_day: "",
      booking_status: "booked",
      payment_status: "pending",
      notes: ""
    });
    loadData();
  };

  const completeBooking = async (id) => {
    await API.put(`/bookings/${id}/status`, {
      booking_status: "completed",
      payment_status: "paid"
    });
    loadData();
  };

  const activeBookings = bookings.filter((booking) => booking.booking_status !== "completed").length;
  const paidBookings = bookings.filter((booking) => booking.payment_status === "paid").length;

  return (
    <div className="app-shell">
      <Navbar />
      <main className="cars-page">
        <section className="cars-hero">
          <div>
            <p className="eyebrow">Reservation control</p>
            <h1>Booking listing</h1>
            <p className="cars-hero__text">
              Track active rentals, return dates, and payment progress from a single
              scheduling workspace.
            </p>
          </div>
          <div className="cars-stats">
            <div className="stat-card">
              <span className="stat-card__label">Total bookings</span>
              <strong>{bookings.length}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">Active</span>
              <strong>{activeBookings}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">Paid</span>
              <strong>{paidBookings}</strong>
            </div>
          </div>
        </section>

        <section className="cars-layout">
          <div className="panel panel--form">
            <div className="panel__header">
              <h2>Create booking</h2>
              <p>Assign an available car to a customer and schedule the trip dates.</p>
            </div>

            <form className="cars-form" onSubmit={saveBooking}>
              <select
                value={form.car_id}
                onChange={(e) => setForm({ ...form, car_id: e.target.value })}
              >
                <option value="">Select Car</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.car_name} - {car.reg_no}
                  </option>
                ))}
              </select>

              <select
                value={form.customer_id}
                onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.full_name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={form.pickup_date}
                onChange={(e) => setForm({ ...form, pickup_date: e.target.value })}
              />
              <input
                type="date"
                value={form.return_date}
                onChange={(e) => setForm({ ...form, return_date: e.target.value })}
              />
              <input
                placeholder="Rate per day"
                value={form.rate_per_day}
                onChange={(e) => setForm({ ...form, rate_per_day: e.target.value })}
              />
              <input
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
              <button type="submit" className="primary-button">Create Booking</button>
            </form>
          </div>

          <div className="panel">
            <div className="panel__header">
              <h2>Booking overview</h2>
              <p>{bookings.length} reservations currently tracked in the system.</p>
            </div>

            <div className="cars-table-wrapper">
              <table className="cars-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Car</th>
                    <th>Customer</th>
                    <th>Pickup</th>
                    <th>Return</th>
                    <th>Days</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.car_name}</td>
                        <td>{booking.customer_name}</td>
                        <td>{booking.pickup_date?.slice(0, 10)}</td>
                        <td>{booking.return_date?.slice(0, 10)}</td>
                        <td>{booking.total_days}</td>
                        <td>AED {booking.total_amount}</td>
                        <td>
                          <span className={`status-pill status-pill--${booking.booking_status}`}>
                            {booking.booking_status}
                          </span>
                        </td>
                        <td>
                          <span className={`status-pill status-pill--${booking.payment_status}`}>
                            {booking.payment_status}
                          </span>
                        </td>
                        <td>
                          {booking.booking_status !== "completed" ? (
                            <button
                              onClick={() => completeBooking(booking.id)}
                              className="primary-button bookings-action"
                              type="button"
                            >
                              Complete
                            </button>
                          ) : (
                            <span className="table-muted">Closed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="cars-table__empty">
                        No bookings created yet. Add one from the form to get started.
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
