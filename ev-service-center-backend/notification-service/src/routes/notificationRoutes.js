import express from 'express';
import {
  getAllNotifications,
  getNotificationsByUser,
  createNotification,
  markAsRead,
  deleteNotification,
} from '../controllers/notificationController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: APIs quản lý thông báo người dùng
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Lấy tất cả thông báo
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Danh sách thông báo
 */
router.get('/', getAllNotifications);

/**
 * @swagger
 * /api/notifications/user/{userId}:
 *   get:
 *     summary: Lấy tất cả thông báo của 1 người dùng
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách thông báo của user
 */
router.get('/user/:userId', getNotificationsByUser);

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Gửi thông báo mới
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, message]
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               message:
 *                 type: string
 *                 example: "Xe của bạn đã hoàn tất bảo dưỡng."
 *               status:
 *                 type: string
 *                 example: "unread"
 *     responses:
 *       201:
 *         description: Tạo thông báo thành công
 */
router.post('/', createNotification);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Đánh dấu thông báo là đã đọc
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/:id/read', markAsRead);


/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Xóa thông báo
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete('/:id', deleteNotification);

export default router;
