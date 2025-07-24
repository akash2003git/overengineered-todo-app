const { z } = require("zod");

const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long" })
    .max(30, { message: "Username cannot exceed 30 characters" })
    .trim(),
  email: z.email({ message: "Invalid email address" }).trim().toLowerCase(),
  password: z
    .string()
    .min(3, { message: "Password must be atleast 3 characters long" })
    .max(100, { message: "Password cannot exceed 100 characters" }),
});

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const todoSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty" }),
  description: z.string().optional(),
  completed: z.boolean().default(false),
});

module.exports = { registerSchema, loginSchema, todoSchema };
