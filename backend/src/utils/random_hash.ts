import crypto from "crypto";

export const hashString = () => {
  return crypto.randomBytes(5).toString("hex");
};
