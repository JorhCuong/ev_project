import express from 'express';
import authRoutes from './authRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import inventoryRoutes from './inventoryRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import chatRoutes from './chatRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/booking', bookingRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/payment', paymentRoutes);
router.use('/chat', chatRoutes);

export default router;
