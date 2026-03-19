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
    setForm({ car_name: "", brand: "", model: "", reg_no: "", rent_per_day: "", status: "available" });
    loadCars();
  };

  const deleteCar = async (id) => {
    await API.delete(`/cars/${id}`);
    loadCars();
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Cars</h2>
        <form onSubmit={saveCar}>
          <input placeholder="Car Name" value={form.car_name} onChange={(e) => setForm({ ...form, car_name: e.target.value })} />
          <input placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
          <input placeholder="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
          <input placeholder="Reg No" value={form.reg_no} onChange={(e) => setForm({ ...form, reg_no: e.target.value })} />
          <input placeholder="Rent/Day" value={form.rent_per_day} onChange={(e) => setForm({ ...form, rent_per_day: e.target.value })} />
          <button type="submit">Add Car</button>
        </form>

        <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
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
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.car_name}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.reg_no}</td>
                <td>{car.rent_per_day}</td>
                <td>{car.status}</td>
                <td>
                  <button onClick={() => deleteCar(car.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}