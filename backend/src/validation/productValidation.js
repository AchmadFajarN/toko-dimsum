import { z } from "zod";

/**
 * Base schema (dipakai ulang)
 */
const baseProductSchema = {
  name: z
    .string()
    .min(3, "Nama produk minimal 3 karakter")
    .max(100, "Nama produk maksimal 100 karakter"),

  description: z
    .string()
    .max(500, "Deskripsi maksimal 500 karakter")
    .nullable()
    .optional(),

  price: z
    .number({
      required_error: "Harga wajib diisi",
      invalid_type_error: "Harga harus berupa angka",
    })
    .positive("Harga harus lebih dari 0"),

  stock: z
    .number({
      invalid_type_error: "Stock harus berupa angka",
    })
    .int("Stock harus bilangan bulat")
    .min(0, "Stock tidak boleh negatif")
    .optional(),

  img_url: z
    .string()
    .url("URL gambar tidak valid")
    .max(255)
    .nullable()
    .optional(),

  is_active: z.boolean().optional(),
};

/**
 * Create product validation
 */
export const createProductSchema = z.object(baseProductSchema);

/**
 * Update product validation (partial / PATCH)
 */
export const updateProductSchema = z
  .object(baseProductSchema)
  .partial();
