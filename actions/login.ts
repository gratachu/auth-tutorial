"use server"

import * as z from "zod";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import {DEFAULT_LOGIN_REDIRECT_URL} from "@/routes";
import {AuthError} from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validationFields = LoginSchema.safeParse(values);

  if (!validationFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password } = validationFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT_URL });
  } catch(error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
}