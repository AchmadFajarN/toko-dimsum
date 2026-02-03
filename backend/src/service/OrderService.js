import { nanoid } from "nanoid";
import { createConnection } from "../model/connectionDb.js";
import { AuthorizationError } from "../error/authorizationError.js";
import { BadRequestError } from "../error/badRequestError.js";
import { NotFoundError } from "../error/notFoundError.js";

class OrderService {
  // Get all orders (admin only)
  async getAllOrders() {
    const connection = await createConnection();
    try {
      const [orders] = await connection.execute(
        `SELECT 
          o.id AS order_id,
          o.user_id,
          o.total_price,
          o.status,
          u.username,
          u.email,
          u.role
        FROM orders o
        JOIN users u ON o.user_id = u.id`,
      );

      // Get order items for each order
      for (const order of orders) {
        const [items] = await connection.execute(
          `SELECT 
            oi.id,
            oi.product_id,
            p.name AS product_name,
            oi.qnty AS quantity,
            oi.price
          FROM order_items oi
          JOIN products p ON oi.product_id = p.id
          WHERE oi.order_id = ?`,
          [order.order_id], 
        );

        order.items = items;
      }

      return orders;
    } finally {
      await connection.end();
    }
  }

  // Get orders by user
  async getOrdersByUser(userId, requesterId, requesterRole) {
    // Check authorization: user can only see their own orders unless admin
    if (requesterRole !== "admin" && userId !== requesterId) {
      throw new AuthorizationError(
        "You are not authorized to access this resource",
      );
    }

    const connection = await createConnection();
    try {
      const [orders] = await connection.execute(
        `SELECT 
          o.id,
          o.user_id,
          o.total_price,
          o.status
        FROM orders o
        WHERE o.user_id = ?`,
        [userId],
      );

      // Get order items for each order
      for (let order of orders) {
        const [items] = await connection.execute(
          `SELECT 
            oi.id,
            oi.product_id,
            p.name as product_name,
            oi.qnty as quantity,
            oi.price
          FROM order_items oi
          JOIN products p ON oi.product_id = p.id
          WHERE oi.order_id = ?`,
          [order.id],
        );
        order.items = items;
      }

      return orders;
    } finally {
      await connection.end();
    }
  }

  // Create new order
  async createOrder(userId, items) {
    const connection = await createConnection();
    try {
      await connection.beginTransaction();

      const orderId = nanoid();
      let totalPrice = 0;
      const orderItems = [];

      // Validate and process each item
      for (let item of items) {
        // Check if product exists and is active
        const [products] = await connection.execute(
          "SELECT id, name, price, stock, is_active FROM products WHERE id = ?",
          [item.product_id],
        );

        if (products.length === 0) {
          throw new NotFoundError(
            `Product with ID ${item.product_id} not found`,
          );
        }

        const product = products[0];

        if (!product.is_active) {
          throw new BadRequestError(`Product ${product.name} is not available`);
        }

        // Check stock availability
        if (product.stock < item.quantity) {
          throw new BadRequestError(
            `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
          );
        }

        // Calculate item total
        const itemTotal = product.price * item.quantity;
        totalPrice += itemTotal;

        orderItems.push({
          id: nanoid(),
          product_id: item.product_id,
          quantity: item.quantity,
          price: product.price,
        });

        // Reduce product stock
        await connection.execute(
          "UPDATE products SET stock = stock - ? WHERE id = ?",
          [item.quantity, item.product_id],
        );
      }

      // Create order
      await connection.execute(
        "INSERT INTO orders (id, user_id, total_price, status) VALUES (?, ?, ?, ?)",
        [orderId, userId, totalPrice, "pending"],
      );

      // Create order items
      for (let orderItem of orderItems) {
        await connection.execute(
          "INSERT INTO order_items (id, order_id, product_id, qnty, price) VALUES (?, ?, ?, ?, ?)",
          [
            orderItem.id,
            orderId,
            orderItem.product_id,
            orderItem.quantity,
            orderItem.price,
          ],
        );
      }

      await connection.commit();
      console.log(orderId);

      // Fetch created order with items
      const [orders] = await connection.execute(
        `SELECT 
          o.id,
          o.user_id,
          o.total_price,
          o.status
        FROM orders AS o
        WHERE o.id = ?`,
        [orderId],
      );

      const [itemsData] = await connection.execute(
        `SELECT 
          oi.id,
          oi.product_id,
          p.name as product_name,
          oi.qnty as quantity,
          oi.price
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?`,
        [orderId],
      );

      return {
        ...orders[0],
        items: itemsData,
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Update order status
  async updateOrder(orderId, newStatus, userId, userRole) {
    const connection = await createConnection();
    try {
      await connection.beginTransaction();

      // Get current order
      const [orders] = await connection.execute(
        "SELECT id, user_id, status FROM orders WHERE id = ?",
        [orderId],
      );

      if (orders.length === 0) {
        throw new NotFoundError("Order not found");
      }

      const order = orders[0];
      const oldStatus = order.status;

      // Check authorization
      if (userRole !== "admin" && order.user_id !== userId) {
        throw new AuthorizationError(
          "You are not authorized to update this order",
        );
      }

      // If changing from pending to cancelled, restore stock
      if (oldStatus === "pending" && newStatus === "cancelled") {
        const [items] = await connection.execute(
          "SELECT product_id, qnty FROM order_items WHERE order_id = ?",
          [orderId],
        );

        for (let item of items) {
          await connection.execute(
            "UPDATE products SET stock = stock + ? WHERE id = ?",
            [item.qnty, item.product_id],
          );
        }
      }

      // Update order status
      await connection.execute("UPDATE orders SET status = ? WHERE id = ?", [
        newStatus,
        orderId,
      ]);

      await connection.commit();

      // Fetch updated order
      const [updatedOrders] = await connection.execute(
        `SELECT 
          o.id,
          o.user_id,
          o.total_price,
          o.status,
          o.created_at,
          o.updated_at
        FROM orders o
        WHERE o.id = ?`,
        [orderId],
      );

      const [itemsData] = await connection.execute(
        `SELECT 
          oi.id,
          oi.product_id,
          p.name as product_name,
          oi.qnty as quantity,
          oi.price
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?`,
        [orderId],
      );

      return {
        ...updatedOrders[0],
        items: itemsData,
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Delete order
  async deleteOrder(orderId, userId, userRole) {
    const connection = await createConnection();
    try {
      await connection.beginTransaction();

      // Get order
      const [orders] = await connection.execute(
        "SELECT id, user_id, status FROM orders WHERE id = ?",
        [orderId],
      );

      if (orders.length === 0) {
        throw new NotFoundError("Order not found");
      }

      const order = orders[0];

      // Check authorization
      if (userRole !== "admin" && order.user_id !== userId) {
        throw new AuthorizationError(
          "You are not authorized to delete this order",
        );
      }

      // If status is pending, restore stock
      if (order.status === "pending") {
        const [items] = await connection.execute(
          "SELECT product_id, qnty FROM order_items WHERE order_id = ?",
          [orderId],
        );

        for (let item of items) {
          await connection.execute(
            "UPDATE products SET stock = stock + ? WHERE id = ?",
            [item.qnty, item.product_id],
          );
        }
      }

      // Delete order (order_items will be deleted automatically due to CASCADE)
      await connection.execute("DELETE FROM orders WHERE id = ?", [orderId]);

      await connection.commit();

      return { id: orderId };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }
  }
}

export default new OrderService();
