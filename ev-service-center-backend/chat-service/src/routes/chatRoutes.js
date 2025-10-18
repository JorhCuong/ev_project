import express from "express";
import { sendMessage, getChatHistory } from '../controllers/chatController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: API trò chuyện dành cho khách hàng và nhân viên
 */

/**
 * @swagger
 * /api/chat/send:
 *   post:
 *     summary: Gửi tin nhắn trò chuyện
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: integer
 *               receiverId:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tin nhắn đã được gửi thành công
 */
router.post("/send", sendMessage);

/**
 * @swagger
 * /api/chat/history/{senderId}/{receiverId}:
 *   get:
 *     summary: Lấy lịch sử trò chuyện giữa hai người dùng
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: senderId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: receiverId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách tin nhắn
 */
router.get("/history/:user1/:user2", getChatHistory);

export default router;
