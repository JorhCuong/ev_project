import express from 'express';
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  addReminder,
  getReminders,
} from '../controllers/vehicleController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: API quản lý phương tiện & nhắc nhở bảo dưỡng
 */

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Lấy danh sách tất cả xe
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: Danh sách xe
 */
router.get('/', getAllVehicles);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của một xe
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của xe
 *     responses:
 *       200:
 *         description: Xe được tìm thấy
 *       404:
 *         description: Không tìm thấy xe
 */
router.get('/:id', getVehicleById);

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Tạo xe mới
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licensePlate:
 *                 type: string
 *                 example: 51H-12345
 *               model:
 *                 type: string
 *                 example: Tesla Model 3
 *               brand:
 *                 type: string
 *                 example: Tesla
 *               year:
 *                 type: integer
 *                 example: 2023
 *               customerId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Tạo xe thành công
 *       400:
 *         description: Lỗi dữ liệu
 */
router.post('/', createVehicle);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Cập nhật thông tin xe
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licensePlate:
 *                 type: string
 *                 example: 51H-99999
 *               model:
 *                 type: string
 *                 example: Tesla Model Y
 *               brand:
 *                 type: string
 *                 example: Tesla
 *     responses:
 *       200:
 *         description: Cập nhật xe thành công
 *       404:
 *         description: Không tìm thấy xe
 */
router.put('/:id', updateVehicle);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   delete:
 *     summary: Xóa xe
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa xe thành công
 *       404:
 *         description: Không tìm thấy xe
 */
router.delete('/:id', deleteVehicle);

// Reminder endpoints
/**
 * @swagger
 * /api/vehicles/{vehicleId}/reminders:
 *   get:
 *     summary: Lấy danh sách nhắc nhở của xe
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách nhắc nhở
 */
router.post('/:vehicle_id/reminders', addReminder);

/**
 * @swagger
 * /api/vehicles/{vehicleId}/reminders:
 *   post:
 *     summary: Thêm nhắc nhở bảo dưỡng cho xe
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: Oil Change
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-01
 *               message:
 *                 type: string
 *                 example: "Đến hạn thay dầu sau 5000km"
 *     responses:
 *       201:
 *         description: Tạo nhắc nhở thành công
 */
router.get('/:vehicle_id/reminders', getReminders);

export default router;
