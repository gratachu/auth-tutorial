"use server"

import * as z from "zod";

import { RegisterSchema } from "@/schemas";

export const register = (values: z.infer<typeof RegisterSchema>) => {
  const validationFields = RegisterSchema.safeParse(values);

  if (!validationFields.success) {
    return { error: "Invalid fields" }
  }

  return { success: "Email sent!"}
}