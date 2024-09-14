import * as JWT from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { env } from "@constants";
import { User } from "@entities";
import { GlobalError, ErrorCodes } from "@exception";
import { invalidTokenRepository, userRepository } from "@repositories";
import { TokenUtils } from "@utils";
import { logger } from "@lib/logger";
import { RefreshTokenRequestDto } from "@dto/request";

class TokenService {
  private _duration: number;
  private _refreshableDuration: number;

  constructor() {
    this._duration = 60; // Second
    this._refreshableDuration = 3600; // second
  }

  /**
   * Refresh the provided JWT token.
   * @param {string} token
   * @returns {string} New refreshed token
   * @throws {GlobalError} If identity is invalid
   */
  public async refreshToken(
    requestData: RefreshTokenRequestDto
  ): Promise<string> {
    // Check expire time token
    const isExpiredToken = TokenUtils.isExpired(requestData.expiredToken);
    if (!isExpiredToken) throw new GlobalError(ErrorCodes.TOKEN_NOT_EXPIRED);

    // Check if the token is still refreshable
    const isExpiredRefresh = TokenUtils.isExpired(requestData.refreshToken);
    if (isExpiredRefresh)
      throw new GlobalError(ErrorCodes.REFRESH_TOKEN_EXPIRED);

    // Get user
    const sub = TokenUtils.extractSubject(requestData.refreshToken);
    const identity = await userRepository.findOneBy({ id: sub });
    if (!identity) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);

    return this.createToken(identity, this._duration);
  }

  /**
   * Validate the provided JWT token.
   * @param {string} token
   * @returns {Promise<boolean>} Returns true if token is valid
   * @throws {GlobalError} If token is invalid or expired
   */
  public async validateToken(token: string): Promise<boolean> {
    const tokenId = TokenUtils.extractId(token);
    const isInvalidToken = await invalidTokenRepository.existsBy({ tokenId });

    if (isInvalidToken) {
      throw new GlobalError(ErrorCodes.INVALID_TOKEN);
    }

    return true;
  }

  /**
   * Private method to create a JWT token with an expiry time.
   * @param {User} identity
   * @param {string | number} expiryTime Expiry date as string (ISO format) or timestamp (ms)
   * @returns {string} JWT token
   */
  private createToken(identity: User, expiryTime: string | number): string {
    return JWT.sign(
      {
        sub: identity.id,
        scope: this.buildScope(identity),
        jti: uuidv4(),
      },
      env.jwtSecret,
      {
        expiresIn: expiryTime,
        algorithm: "HS512",
      }
    );
  }

  /**
   * Build a scope string from the identity's authorities.
   * @param {User} identity
   * @returns {string} The scope string
   */
  private buildScope(identity: User): string {
    return "";
  }

  /**
   * Create a JWT token for the provided identity.
   * @param {User} identity
   * @returns {string} JWT token
   */
  public generateToken(identity: User): {
    token: string;
    refreshToken: string;
  } {
    return {
      token: this.createToken(identity, this._duration),
      refreshToken: this.createToken(identity, this._refreshableDuration),
    };
  }
}

export default new TokenService();
