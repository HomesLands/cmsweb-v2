import * as JWT from "jsonwebtoken";

import { env } from "@constants";
import { ErrorCodes } from "@exception/error-code";
import { GlobalError } from "@exception/global-error";

export class TokenUtils {
  /**
   * Extract all claims from the given JWT token.
   * @param {string} token
   * @returns {JWT.JwtPayload | string} Claims from the token
   */
  static extractAllClaims(token: string): JWT.JwtPayload | string {
    return JWT.verify(token, env.jwtSecret); // Verify and extract claims
  }

  /**
   * Extract the expiration date from the given JWT token.
   * @param {string} token
   * @returns {Moment} Expiration date
   */
  static extractExpiration(token: string): Date {
    const claims = TokenUtils.extractAllClaims(token);
    if (typeof claims === "object" && "exp" in claims && claims.exp) {
      return new Date(claims.exp * 1000);
    }
    throw new GlobalError(ErrorCodes.INVALID_JWT_PAYLOAD);
  }

  /**
   * Extract the token ID (jti claim) from the given JWT token.
   * @param {string} token
   * @returns {string} Token ID (jti)
   */
  static extractId(token: string): string {
    const claims = TokenUtils.extractAllClaims(token);
    if (typeof claims === "object" && "jti" in claims && claims.jti) {
      return claims.jti; // Convert expiration time from seconds to milliseconds
    }
    throw new GlobalError(ErrorCodes.INVALID_JWT_PAYLOAD);
  }

  /**
   * Extract the expiration date from the given JWT token.
   * @param {string} token
   * @returns {number} Expiration date
   */
  static extractIat(token: string): number {
    const claims = TokenUtils.extractAllClaims(token);
    if (typeof claims === "object" && "iat" in claims && claims.iat) {
      return claims.iat; // Convert expiration time from seconds to milliseconds
    }
    throw new GlobalError(ErrorCodes.INVALID_JWT_PAYLOAD);
  }

  /**
   * Extract the subject (sub claim) from the given JWT token.
   * @param {string} token
   * @returns {string | Function | undefined} Resolved claim
   */
  static extractSubject(token: string): string | undefined {
    const claims = TokenUtils.extractAllClaims(token);
    if (typeof claims === "object") {
      return claims.sub; // Convert expiration time from seconds to milliseconds
    }
    throw new GlobalError(ErrorCodes.INVALID_JWT_PAYLOAD);
  }
}