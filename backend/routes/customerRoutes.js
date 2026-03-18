const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM customers ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { full_name, phone, email, license_no, address } = req.body;

    await db.query(
      "INSERT INTO customers (full_name, phone, email, license_no, address) VALUES (?, ?, ?, ?, ?)",
      [full_name, phone, email, license_no, address]
    );

    res.json({ message: "Customer added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { full_name, phone, email, license_no, address } = req.body;

    await db.query(
      "UPDATE customers SET full_name=?, phone=?, email=?, license_no=?, address=? WHERE id=?",
      [full_name, phone, email, license_no, address, req.params.id]
    );

    res.json({ message: "Customer updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await db.query("DELETE FROM customers WHERE id=?", [req.params.id]);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;