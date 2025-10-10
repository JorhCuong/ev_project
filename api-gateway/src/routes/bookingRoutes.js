import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const baseURL = process.env.BOOKING_SERVICE_URL;

// Lấy tất cả booking
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/bookings`);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

// Tạo booking mới
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(`${baseURL}/bookings`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

// Lấy chi tiết booking theo ID
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/bookings/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

export default router;
