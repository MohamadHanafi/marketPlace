import express from 'express';

import {createOrder, getOrderById, payOrder} from '../controllers/orderControllers.js'
import {protect} from '../middleware/authMiddleware.js'


const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').post(protect, payOrder);



export default router;