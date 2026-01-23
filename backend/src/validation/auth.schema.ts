import z from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2).max(30),
  email: z.email(),
  password: z.string().min(6).max(15),
});

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(15),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
