import orderService from '../service/OrderService.js';

class OrderController {
  // Get all orders (admin only)
  async getAllOrders(req, res, next) {
    try {
      const orders = await orderService.getAllOrders();
      
      res.status(200).json({
        success: true,
        message: 'Orders retrieved successfully',
        data: orders
      });
    } catch (error) {
      next(error);
    }
  }

  // Get orders by user
  async getOrdersByUser(req, res, next) {
    try {
      const userId = req.user.id;
      const requesterId = req.user.id;
      const requesterRole = req.user.role;

      const orders = await orderService.getOrdersByUser(userId, requesterId, requesterRole);
      
      res.status(200).json({
        success: true,
        message: 'User orders retrieved successfully',
        data: orders
      });
    } catch (error) {
      next(error);
    }
  }

  // Create new order
  async createOrder(req, res, next) {
    try {
      const userId = req.user.id;
      const { items } = req.body;

      const order = await orderService.createOrder(userId, items);
      
      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  // Update order status
  async updateOrder(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userId = req.user.id;
      const userRole = req.user.role;

      const order = await orderService.updateOrder(id, status, userId, userRole);
      
      res.status(200).json({
        success: true,
        message: 'Order updated successfully',
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete order
  async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const userRole = req.user.role;

      const result = await orderService.deleteOrder(id, userId, userRole);
      
      res.status(200).json({
        success: true,
        message: 'Order deleted successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();