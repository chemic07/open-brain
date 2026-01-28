import z from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6).max(15),
  newPassword: z.string().min(6).max(15),
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
