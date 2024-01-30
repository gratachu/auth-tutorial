"use server"

import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";

const SALT_ROUNDS = 10;

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validationFields = RegisterSchema.safeParse(values);

  if (!validationFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password, name } = validationFields.data;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const existingUser = await getUserByEmail(email)

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

  const verificationToken = await generateVerificationToken(email);

  // TODO: Send verification email

  return { success: "Confirmation email sent!" }
}
