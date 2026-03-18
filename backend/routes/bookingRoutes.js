const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        b.*,
        c.car_name,
        c.reg_no,
        cu.full_name AS customer_name,
        cu.phone
      FROM bookings b
      JOIN cars c ON b.car_id = c.id
      JOIN customers cu ON b.customer_id = cu.id
      ORDER BY b.id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      car_id,
      customer_id,
      pickup_date,
      return_date,
      rate_per_day,
      booking_status,
      payment_status,
      notes
    } = req.body;

    const start = new Date(pickup_date);
    const end = new Date(return_date);
    const diffTime = end - start;
    const total_days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (total_days <= 0) {
      return res.status(400).json({ message: "Invalid booking dates" });
    }

    const total_amount = total_days * Number(rate_per_day);

    await db.query(
      `INSERT INTO bookings
      (car_id, customer_id, pickup_date, return_date, total_days, rate_per_day, total_amount, booking_status, payment_status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        car_id,
        customer_id,
        pickup_date,
        return_date,
        total_days,
        rate_per_day,
        total_amount,
        booking_status || "booked",
        payment_status || "pending",
        notes
      ]
    );

    await db.query("UPDATE cars SET status='booked' WHERE id=?", [car_id]);

    res.json({ message: "Booking created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { booking_status, payment_status } = req.body;

    const [rows] = await db.query("SELECT * FROM bookings WHERE id=?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const booking = rows[0];

    await db.query(
      "UPDATE bookings SET booking_status=?, payment_status=? WHERE id=?",
      [booking_status, payment_status, req.params.id]
    );

    if (booking_status === "completed" || booking_status === "cancelled") {
      await db.query("UPDATE cars SET status='available' WHERE id=?", [booking.car_id]);
    }

    res.json({ message: "Booking status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;