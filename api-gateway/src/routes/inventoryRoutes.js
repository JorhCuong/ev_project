import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const baseURL = process.env.INVENTORY_SERVICE_URL;

// Lấy danh sách xe
router.get("/vehicles", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/vehicles`);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

// Thêm xe mới
router.post("/vehicles", async (req, res) => {
  try {
    const response = await axios.post(`${baseURL}/vehicles`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

export default router;
