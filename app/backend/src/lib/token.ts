import * as JWT from "jsonwebtoken";
import { env } from "@constants";

export function generateToken(id: string, provider: string): string {
  return JWT.sign(
    {
      iss: "ApiAuth", //source
      id,
      provider,
      iat: Date.now(), // time sign
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
    },
    env.jwtSecret
  );
}

export function refreshToken() {
  return null;
}
