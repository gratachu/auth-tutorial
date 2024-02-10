import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string()
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum of 6 characters",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});