import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    car_name: "",
    brand: "",
    model: "",
    reg_no: "",
    rent_per_day: "",
    status: "available"
  });

  const loadCars = async () => {
    const res = await API.get("/cars");
    setCars(res.data);
  };

  useEffect(() => {
    loadCars();
  }, []);

  const saveCar = async (e) => {
    e.preventDefault();
    await API.post("/cars", form);
    setForm({
      car_name: "",
      brand: "",
      model: "",
      reg_no: "",
      rent_per_day: "",
      status: "available"
    });
    loadCars();
  };

  const deleteCar = async (id) => {
    await API.delete(`/cars/${id}`);
    loadCars();
  };

  const totalCars = cars.length;
  const availableCars = cars.filter((car) => car.status === "available").length;
  const bookedCars = totalCars - availableCars;

  return (
    <div className="app-shell">
      <Navbar />
      <main className="cars-page">
        <section className="cars-hero">
          <div>
            <p className="eyebrow">Fleet management</p>
            <h1>Car listing</h1>
            <p className="cars-hero__text">
              Keep your rental inventory organized with a clearer overview of availability,
              pricing, and registration details.
            </p>
          </div>
          <div className="cars-stats">
            <div className="stat-card">
              <span className="stat-card__label">Total cars</span>
              <strong>{totalCars}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">Available</span>
              <strong>{availableCars}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">Booked</span>
              <strong>{bookedCars}</strong>
            </div>
          </div>
        </section>

        <section className="cars-layout">
          <div className="panel panel--form">
            <div className="panel__header">
              <h2>Add a new car</h2>
              <p>Create a vehicle profile with rent and registration details.</p>
            </div>

            <form className="cars-form" onSubmit={saveCar}>
              <input
                placeholder="Car Name"
                value={form.car_name}
                onChange={(e) => setForm({ ...form, car_name: e.target.value })}
              />
              <input
                placeholder="Brand"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              />
              <input
                placeholder="Model"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
              />
              <input
                placeholder="Reg No"
                value={form.reg_no}
                onChange={(e) => setForm({ ...form, reg_no: e.target.value })}
              />
              <input
                placeholder="Rent/Day"
                value={form.rent_per_day}
                onChange={(e) => setForm({ ...form, rent_per_day: e.target.value })}
              />
              <button type="submit" className="primary-button">Add Car</button>
            </form>
          </div>

          <div className="panel">
            <div className="panel__header">
              <h2>Fleet overview</h2>
              <p>{totalCars} vehicles currently listed in the system.</p>
            </div>

            <div className="cars-table-wrapper">
              <table className="cars-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Car</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Reg No</th>
                    <th>Rent/Day</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.length > 0 ? (
                    cars.map((car) => (
                      <tr key={car.id}>
                        <td>{car.id}</td>
                        <td>{car.car_name}</td>
                        <td>{car.brand}</td>
                        <td>{car.model}</td>
                        <td>{car.reg_no}</td>
                        <td>AED {car.rent_per_day}</td>
                        <td>
                          <span className={`status-pill status-pill--${car.status}`}>
                            {car.status}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => deleteCar(car.id)}
                            className="danger-button"
                            type="button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="cars-table__empty">
                        No cars added yet. Use the form to create your first listing.
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
