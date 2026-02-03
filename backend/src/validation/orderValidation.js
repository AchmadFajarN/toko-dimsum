import { z } from 'zod';

// Validation schema for creating order
export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      product_id: z.string().min(1, 'Product ID is required'),
      quantity: z.number().int().min(1, 'Quantity must be at least 1')
    })
  ).min(1, 'At least one item is required')
});

// Validation schema for updating order status
export const updateOrderSchema = z.object({
  status: z.enum(['pending', 'paid', 'shipped', 'done', 'cancelled'], {
    errorMap: () => ({ message: 'Invalid status value' })
  })
});

// Middleware to validate request body
export const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      next(error);
    }
  };
};