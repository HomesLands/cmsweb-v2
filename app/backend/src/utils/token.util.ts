import * as JWT from "jsonwebtoken";
import _ from "lodash";

import { env } from "@constants";
import { ErrorCodes } from "@exception/error-code";
import { GlobalError } from "@exception/global-error";
import { logger } from "@lib";
import { invalidTokenRepository } from "@repositories";

export class TokenUtils {
  /**
   * Extract all claims from the given JWT token.
   * @param {string} token
   * @returns {boolean} Result of verify token
   */
  static async isExpired(token: string): Promise<boolean> {
    try {
      logger.info({ jwtSecret: env.jwtSecret });
      JWT.verify(token, env.jwtSecret); // Verify and extract claims
      const tokenId = TokenUtils.extractId(token);
      const isExist = await invalidTokenRepository.existsBy({ tokenId });
      if (isExist) return true;
      return false;
    } catch (error) {
      logger.error(TokenUtils.name, error);
      return true;
    }
  }

  /**
   * Extract all claims from the given JWT token.
   * @param {string} token
   * @returns {JWT.JwtPayload | string} Claims from the token
   */
  static extractAllClaims(token: string): JWT.JwtPayload | string {
    try {
      return JWT.verify(token, env.jwtSecret); // Verify and extract claims
    } catch (error) {
      logger.error("", error);
      throw new GlobalError(ErrorCodes.TOKEN_EXPIRED);
    }
  }

  /**
   * Extract the expiration date from the given JWT token.
   * @param {string} token
   * @returns {Moment} Expiration date
   */
  static extractExpiration(token: string): Date {
    const claims = TokenUtils.extractAllClaims(token);
    if (typeof claims === "object" && _.has(claims, "exp") && claims.exp) {
      return new Date(claims.exp * 1000);
    }
    throw new GlobalError(ErrorCodes.EXP_NOT_EXIST);
  }

  /**
   * Extract the expiration date from the given JWT token.
   * @param {string} token
   * @returns {string} Type of token
   */
  static extractType(token: string): string {
    const claims = TokenUtils.extractAllClaims(token);
    if (typeof claims === "object" && _.has(claims, "type") && claims.type) {
      return claims.type;
    }
    throw new GlobalError(ErrorCodes.TOKEN_TYPE_NOT_EXIST);
  }

  /**
   * Extract the token ID (jti claim) from the given JWT token.
   * @param {string} token
   * @returns {string} Token ID (jti)
   */
  static extractId(token: string): string {
    const claims = TokenUtils.extractAllClaims(token);
    if (typeof claims === "object" && _.has(claims, "jti") && claims.jti) {
      return claims.jti; // Convert expiration time from seconds to milliseconds
    }
    throw new GlobalError(ErrorCodes.TOKEN_ID_NOT_EXIST);
  }

  /**
   * Extract the expiration date from the given JWT token.
   * @param {string} token
   * @returns {number} Expiration date
   */
  static extractIat(token: string): number {
    const claims = TokenUtils.extractAllClaims(token);
    if (typeof claims === "object" && _.has(claims, "iat") && claims.iat) {
      return claims.iat; // Convert expiration time from seconds to milliseconds
    }
    throw new GlobalError(ErrorCodes.IAT_NOT_EXIST);
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
    throw new GlobalError(ErrorCodes.SUBJECT_NOT_EXIST);
  }
}
