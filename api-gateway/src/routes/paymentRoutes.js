import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const baseURL = process.env.PAYMENT_SERVICE_URL;

// Xử lý thanh toán
router.post("/process", async (req, res) => {
  try {
    const response = await axios.post(`${baseURL}/payments/process`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

// Lấy lịch sử thanh toán
router.get("/history/:userId", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/payments/history/${req.params.userId}`);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

export default router;
