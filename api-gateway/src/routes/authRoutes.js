import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const baseURL = process.env.AUTH_SERVICE_URL;

router.post('/login', async (req, res) => {
  try {
    const response = await axios.post(`${baseURL}/login`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const response = await axios.post(`${baseURL}/register`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

export default router;
