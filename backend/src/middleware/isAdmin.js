import { AuthorizationError } from '../error/authorizationError.js';

/**
 * Middleware to check if user has admin role
 * This middleware should be used after authentication middleware
 * that sets req.user
 */
export const isAdmin = (req, res, next) => {
  try {
    // Check if user exists in request (should be set by auth middleware)
    if (!req.user) {
      throw new AuthorizationError('Authentication required');
    }

    // Check if user has admin role
    if (req.user.role !== 'admin') {
      throw new AuthorizationError('Access denied. Admin privileges required');
    }

    // User is admin, proceed to next middleware/controller
    next();
  } catch (error) {
    next(error);
  }
};