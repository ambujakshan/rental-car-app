const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM cars ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/available", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM cars WHERE status = 'available' ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      car_name, brand, model, reg_no, year_of_make, color,
      fuel_type, transmission, seat_count, rent_per_day, status, image_url
    } = req.body;

    await db.query(
      `INSERT INTO cars 
      (car_name, brand, model, reg_no, year_of_make, color, fuel_type, transmission, seat_count, rent_per_day, status, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [car_name, brand, model, reg_no, year_of_make, color, fuel_type, transmission, seat_count, rent_per_day, status || "available", image_url]
    );

    res.json({ message: "Car added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const {
      car_name, brand, model, reg_no, year_of_make, color,
      fuel_type, transmission, seat_count, rent_per_day, status, image_url
    } = req.body;

    await db.query(
      `UPDATE cars SET
      car_name=?, brand=?, model=?, reg_no=?, year_of_make=?, color=?,
      fuel_type=?, transmission=?, seat_count=?, rent_per_day=?, status=?, image_url=?
      WHERE id=?`,
      [car_name, brand, model, reg_no, year_of_make, color, fuel_type, transmission, seat_count, rent_per_day, status, image_url, req.params.id]
    );

    res.json({ message: "Car updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await db.query("DELETE FROM cars WHERE id = ?", [req.params.id]);
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;