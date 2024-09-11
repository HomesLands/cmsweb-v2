import * as JWT from "jsonwebtoken";
import moment from "moment";

import { env } from "@constants";
import { User } from "@entities";
import { GlobalError, ErrorCodes } from "@exception";
import { invalidTokenRepository, userRepository } from "@repositories";
import { TokenUtils } from "@utils";
import { logger } from "@lib/logger";

class TokenService {
  private _duration: number;
  private _refreshableDuration: number;

  constructor() {
    this._duration = 3600; // Second
    this._refreshableDuration = 36000;
  }

  /**
   * Refresh the provided JWT token.
   * @param {string} token
   * @returns {string} New refreshed token
   * @throws {GlobalError} If identity is invalid
   */
  public async refreshToken(token: string): Promise<string> {
    await this.validateToken(token);

    // Invalidate the old token
    const invalidatedToken = {
      tokenId: TokenUtils.extractId(token),
      expiryDate: TokenUtils.extractExpiration(token),
    };
    await invalidTokenRepository.createAndSave(invalidatedToken);

    const id = TokenUtils.extractSubject(token);
    const identity = await userRepository.findOneBy({ id });
    if (!identity) {
      throw new GlobalError(ErrorCodes.UNAUTHENTICATED);
    }

    const iat = TokenUtils.extractIat(token);
    const expiryTime = iat * 1000 + this._refreshableDuration * 1000; // expiryTime as a timestamp in ms

    return this.createToken(identity, expiryTime);
  }

  /**
   * Validate the provided JWT token.
   * @param {string} token
   * @returns {Promise<boolean>} Returns true if token is valid
   * @throws {GlobalError} If token is invalid or expired
   */
  public async validateToken(token: string): Promise<boolean> {
    const expiryTime = TokenUtils.extractExpiration(token);

    if (expiryTime.getTime() > Date.now()) {
      throw new GlobalError(ErrorCodes.TOKEN_NOT_EXPIRED);
    }

    const id = TokenUtils.extractSubject(token);
    const identity = await userRepository.findOneBy({ id });
    if (!identity) {
      throw new GlobalError(ErrorCodes.SUBJECT_NOT_EXIST);
    }

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
  public generateToken(identity: User): string {
    const expiryTime = moment().add(this._duration, "second").unix();
    return this.createToken(identity, expiryTime);
  }
}

export default new TokenService();
