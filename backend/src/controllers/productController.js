import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../service/ProductService.js";
import { createProductSchema } from "../validation/productValidation.js";
import { AuthorizationError } from "../error/authorizationError.js";
import { BadRequestError } from "../error/badRequestError.js";
import { NotFoundError } from "../error/notFoundError.js";

export const createProductController = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      throw new AuthorizationError();
    }

    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.flatten().fieldErrors
      })
    }

    const result = await createProduct(parsed.data);
    return res.status(201).json({
      success: true,
      message: "produk baru telah dibuat",
      data: result,
    });
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * GET /products
 * Public (non-admin allowed)
 */
export const getProductsController = async (req, res) => {
  try {
    const products = await getProducts();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * GET /products/:id
 * Public (non-admin allowed)
 */
export const getProductByIdController = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      throw new NotFoundError("Produk tidak ditemukan");
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * PUT /products/:id
 * Admin only
 */
export const updateProductController = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      throw new AuthorizationError();
    }

    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError(
        "Validasi gagal",
        parsed.error.flatten().fieldErrors,
      );
    }

    const updated = await updateProduct(req.params.id, parsed.data);
    if (!updated) {
      throw new NotFoundError("Produk tidak ditemukan");
    }

    return res.status(200).json({
      success: true,
      message: "Produk berhasil diperbarui",
    });
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        errors: err.errors ?? null,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * DELETE /products/:id
 * Admin only
 */
export const deleteProductController = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      throw new AuthorizationError();
    }

    const deleted = await deleteProduct(req.params.id);
    if (!deleted) {
      throw new NotFoundError("Produk tidak ditemukan");
    }

    return res.status(200).json({
      success: true,
      message: "Produk berhasil dihapus",
    });
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
