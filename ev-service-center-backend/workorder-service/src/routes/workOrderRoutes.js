import express from 'express';
import {
  getAllWorkOrders,
  getWorkOrderById,
  createWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
  addChecklistItem,
  getChecklistItems,
} from '../controllers/workOrderController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: WorkOrders
 *   description: API quản lý phiếu công việc (Work Orders) và checklist bảo dưỡng
 */

/**
 * @swagger
 * /api/workorders:
 *   get:
 *     summary: Lấy danh sách tất cả Work Orders
 *     tags: [WorkOrders]
 *     responses:
 *       200:
 *         description: Danh sách work orders
 */
router.get('/', getAllWorkOrders);

/**
 * @swagger
 * /api/workorders/{id}:
 *   get:
 *     summary: Lấy thông tin Work Order theo ID
 *     tags: [WorkOrders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID Work Order
 *     responses:
 *       200:
 *         description: Work Order được tìm thấy
 *       404:
 *         description: Không tìm thấy
 */
router.get('/:id', getWorkOrderById);

/**
 * @swagger
 * /api/workorders:
 *   post:
 *     summary: Tạo Work Order mới
 *     tags: [WorkOrders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingId:
 *                 type: integer
 *                 example: 3
 *               technicianId:
 *                 type: integer
 *                 example: 2
 *               status:
 *                 type: string
 *                 example: "in_progress"
 *               notes:
 *                 type: string
 *                 example: "Thay pin và kiểm tra hệ thống điện"
 *     responses:
 *       201:
 *         description: Tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', createWorkOrder);

/**
 * @swagger
 * /api/workorders/{id}:
 *   put:
 *     summary: Cập nhật Work Order
 *     tags: [WorkOrders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID Work Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "completed"
 *               notes:
 *                 type: string
 *                 example: "Đã thay pin, test OK"
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy Work Order
 */
router.put('/:id', updateWorkOrder);

/**
 * @swagger
 * /api/workorders/{id}:
 *   delete:
 *     summary: Xóa Work Order
 *     tags: [WorkOrders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy Work Order
 */
router.delete('/:id', deleteWorkOrder);

// Checklist items
/**
 * @swagger
 * /api/workorders/{workOrderId}/checklist:
 *   get:
 *     summary: Lấy danh sách checklist item của Work Order
 *     tags: [WorkOrders]
 *     parameters:
 *       - in: path
 *         name: workOrderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Work Order
 *     responses:
 *       200:
 *         description: Danh sách checklist items
 */
router.post('/:work_order_id/checklist', addChecklistItem);

/**
 * @swagger
 * /api/workorders/{workOrderId}/checklist:
 *   post:
 *     summary: Thêm checklist item cho Work Order
 *     tags: [WorkOrders]
 *     parameters:
 *       - in: path
 *         name: workOrderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Work Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Kiểm tra hệ thống sạc"
 *               status:
 *                 type: string
 *                 example: "pending"
 *     responses:
 *       201:
 *         description: Checklist item được thêm thành công
 */
router.get('/:work_order_id/checklist', getChecklistItems);

export default router;
