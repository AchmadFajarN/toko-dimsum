import express from 'express';
import orderController from '../controllers/orderController.js';
import { validate, createOrderSchema, updateOrderSchema } from '../validation/orderValidation.js';
// Assuming you have these middlewares
import { authenticate } from '../middleware/authenticate.js';
import { isAdmin } from '../middleware/isAdmin.js';

const orderRouter = express.Router();
// Note: Replace 'authenticate' and 'isAdmin' with your actual middleware names
// I'm using placeholder names based on common conventions

/**
 * GET /orders
 * Get all orders (admin only)
 * Requires: Authentication + Admin role
 */
orderRouter.get(
  '/',
  authenticate, 
  isAdmin,       // Uncomment and replace with your admin middleware
  orderController.getAllOrders
);

/**
 * GET /orders/user
 * Get orders for the logged-in user
 * Requires: Authentication
 */
orderRouter.get(
  '/user',
  authenticate, 
  orderController.getOrdersByUser
);

/**
 * POST /orders
 * Create new order
 * Requires: Authentication
 */
orderRouter.post(
  '/',
  authenticate, 
  validate(createOrderSchema),
  orderController.createOrder
);

/**
 * PUT /orders/:id
 * Update order status
 * Requires: Authentication
 */
orderRouter.put(
  '/:id',
  authenticate, 
  validate(updateOrderSchema),
  orderController.updateOrder
);

/**
 * DELETE /orders/:id
 * Delete order
 * Requires: Authentication
 */
orderRouter.delete(
  '/:id',
  authenticate, 
  orderController.deleteOrder
);

export default orderRouter;