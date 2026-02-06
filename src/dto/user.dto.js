import { z } from "zod";

export const createUserDTO = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string()
    .email("Invalid email format")
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must be a Gmail address (@gmail.com)"
    }),
});

export const updateUserDTO = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  email: z.string()
    .email("Invalid email format")
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must be a Gmail address (@gmail.com)"
    })
    .optional(),
});