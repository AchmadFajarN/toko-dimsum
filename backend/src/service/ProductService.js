import { nanoid } from "nanoid";
import { createConnection } from "../model/connectionDb.js";

/**
 * Get all products
 */
export const getProducts = async () => {
  const db = await createConnection();

  const [rows] = await db.query(`
    SELECT 
      *
    FROM products
  `);

  return rows;
};

/**
 * Get product by id
 */
export const getProductById = async (id) => {
  const db = await createConnection();

  const [rows] = await db.query(
    `SELECT * FROM products WHERE id = ?`,
    [id]
  );

  return rows[0] ?? null;
};

/**
 * Create product
 */
export const createProduct = async (payload) => {
  const db = await createConnection();

  const product = {
    id: nanoid(36),
    name: payload.name,
    description: payload.description ?? null,
    price: payload.price,
    stock: payload.stock ?? 1,
    img_url: payload.img_url ?? null,
    is_active: payload.is_active ?? false,
  };

  await db.query(
    `INSERT INTO products 
     (id, name, description, price, stock, img_url, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      product.id,
      product.name,
      product.description,
      product.price,
      product.stock,
      product.img_url,
      product.is_active,
    ]
  );

  return product;
};

/**
 * Update product
 */
export const updateProduct = async (id, payload) => {
  const db = await createConnection();

  const [result] = await db.query(
    `UPDATE products SET
      name = ?,
      description = ?,
      price = ?,
      stock = ?,
      img_url = ?,
      is_active = ?
     WHERE id = ?`,
    [
      payload.name,
      payload.description ?? null,
      payload.price,
      payload.stock,
      payload.img_url ?? null,
      payload.is_active,
      id,
    ]
  );

  return result.affectedRows > 0;
};

/**
 * Soft filter: active products
 */
export const getActiveProducts = async () => {
  const db = await createConnection();

  const [rows] = await db.query(
    `SELECT * FROM products WHERE is_active = true`
  );

  return rows;
};

/**
 * Delete product (hard delete)
 */
export const deleteProduct = async (id) => {
  const db = await createConnection();

  const [result] = await db.query(
    `DELETE FROM products WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
};
