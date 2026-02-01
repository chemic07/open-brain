import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const message = result.error.issues[0]!.message;
        return res.status(400).json({ error: message });
      }

      req.body = result.data;
      next();
    } catch (error) {}
  };
