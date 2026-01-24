import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

interface JwtUserPayload extends JwtPayload {
  userId: string;
}

function isJwtUserPayload(payload: unknown): payload is JwtUserPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "userId" in payload &&
    typeof (payload as any).userId === "string"
  );
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({ error: "Token is missing" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token is missing" });
    }

    const payload = jwt.verify(token!, process.env.JWT_SECRET as string);

    if (!isJwtUserPayload(payload)) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.userId = payload.userId;
    req.token = token;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token is invalid or expired" });
  }
}
