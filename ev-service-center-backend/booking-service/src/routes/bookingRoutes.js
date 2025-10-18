import express from 'express';
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from '../controllers/bookingController.js';

const router = express.Router();
/**
 * @swagger
 * /api/booking:
 *   get:
 *     summary: Nhận tất cả các lịch đặt dịch vụ
 *     tags: [Booking]
 */
router.get('/', getAllAppointments);
/**
 * @swagger
 * /api/booking/{id}:
 *   get:
 *     summary: Nhận đặt lịch theo ID
 *     tags: [Booking]
 */
router.get('/:id', getAppointmentById);
/**
 * @swagger
 * /api/booking:
 *   post:
 *     summary: Tạo một lịch đặt dịch vụ mới
 *     tags: [Booking]
 */
router.post('/', createAppointment);
/**
 * @swagger
 * /api/booking/{id}/status:
 *   put:
 *     summary: Cập nhật trạng thái đặt lịch
 *     tags: [Booking]
 */
router.put('/:id', updateAppointment);
/**
 * @swagger
 * /api/booking/{id}:
 *   delete:
 *     summary: Xóa đặt lịch
 *     tags: [Booking]
 */
router.delete('/:id', deleteAppointment);

export default router;
