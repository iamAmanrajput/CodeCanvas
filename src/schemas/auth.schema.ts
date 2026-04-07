import { email, z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be less than 20 characters"),

  email: z.string().trim().toLowerCase().email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters"),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type SignupErrorSchemaType = Partial<
  Record<keyof SignupSchemaType, string[]>
>;

export const signinSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SigninSchemaType = z.infer<typeof signinSchema>;
export type SigninErrorSchemaType = Partial<
  Record<keyof SigninSchemaType, string[]>
>;
