import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  CreateProductReview,
  getTopProducts,
} from '../controllers/productControllers.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/top').get(getTopProducts);

router.route('/:id/reviews').post(protect, CreateProductReview);

router
  .route('/:id')
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
