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

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Bookings</h2>

        <form onSubmit={saveBooking}>
          <select value={form.car_id} onChange={(e) => setForm({ ...form, car_id: e.target.value })}>
            <option value="">Select Car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.car_name} - {car.reg_no}
              </option>
            ))}
          </select>

          <select value={form.customer_id} onChange={(e) => setForm({ ...form, customer_id: e.target.value })}>
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name}
              </option>
            ))}
          </select>

          <input type="date" value={form.pickup_date} onChange={(e) => setForm({ ...form, pickup_date: e.target.value })} />
          <input type="date" value={form.return_date} onChange={(e) => setForm({ ...form, return_date: e.target.value })} />
          <input placeholder="Rate per day" value={form.rate_per_day} onChange={(e) => setForm({ ...form, rate_per_day: e.target.value })} />
          <input placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <button type="submit">Create Booking</button>
        </form>

        <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
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
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.car_name}</td>
                <td>{b.customer_name}</td>
                <td>{b.pickup_date?.slice(0, 10)}</td>
                <td>{b.return_date?.slice(0, 10)}</td>
                <td>{b.total_days}</td>
                <td>{b.total_amount}</td>
                <td>{b.booking_status}</td>
                <td>{b.payment_status}</td>
                <td>
                  {b.booking_status !== "completed" && (
                    <button onClick={() => completeBooking(b.id)}>Complete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}