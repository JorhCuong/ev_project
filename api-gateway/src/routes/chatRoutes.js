import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const baseURL = process.env.CHAT_SERVICE_URL;

// Gửi tin nhắn
router.post("/send", async (req, res) => {
  try {
    const response = await axios.post(`${baseURL}/chat/send`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

// Lấy lịch sử tin nhắn
router.get("/history/:roomId", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/chat/history/${req.params.roomId}`);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

export default router;
