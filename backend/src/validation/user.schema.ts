import z from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(6, "Password should be greater than 6 character")
    .max(15, "Password should be less than 15 character"),
  newPassword: z
    .string()
    .min(6, "Password should be greater than 6 character")
    .max(15, "Password should be less than 15 character"),
});

export const updateUserProfileSchema = z.object({
  userName: z.string().max(30),
  email: z.email(),
});

export const deletUserSchema = z.object({
  password: z.string().min(6).max(15),
});

export type updateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
export type changePasswordInput = z.infer<typeof changePasswordSchema>;
export type deletUserInput = z.infer<typeof deletUserSchema>;
