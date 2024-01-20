"use server"

import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

import { RegisterSchema } from "@/schemas";

const SALT_ROUNDS = 10;

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validationFields = RegisterSchema.safeParse(values);

  if (!validationFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password, name } = validationFields.data;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const existingUser = await db.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return { error: "Email already in use" }
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  })

  // TODO: Send verification email

  return { success: "User created!" }
}
