import { z } from "zod";

export const registerUserSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  email: z.string().email("Format email tidak valid"),
});

export const loginSchema = z.object({
  username: z.string().min(3, "username minimal 3 karakter"),
  password: z.string().min(6, 'password minimal 6 karakter')
})