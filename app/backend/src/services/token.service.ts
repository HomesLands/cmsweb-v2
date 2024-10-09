import * as JWT from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { env } from "@constants";
import { InvalidToken, User } from "@entities";
import { GlobalError, ErrorCodes } from "@exception";
import { invalidTokenRepository, userRepository } from "@repositories";
import { TokenUtils } from "@utils";
import { RefreshTokenRequestDto } from "@dto/request";

class TokenService {
  private _duration: number;
  private _refreshableDuration: number;

  constructor() {
    this._duration = env.duration; // Second
    this._refreshableDuration = env.refreshableDuration; // second
  }

  /**
   * Refresh the provided JWT token.
   * @param {RefreshTokenRequestDto} requestData
   * @returns {string} New refreshed token
   * @throws {GlobalError} If identity is invalid
   */
  public async refreshToken(
    requestData: RefreshTokenRequestDto
  ): Promise<{ token: string; refreshToken: string }> {
    // Check expire time token
    const isExpiredToken = await TokenUtils.isExpired(requestData.expiredToken);
    if (!isExpiredToken) throw new GlobalError(ErrorCodes.TOKEN_NOT_EXPIRED);

    // Check if the token is still refreshable
    const isExpiredRefresh = await TokenUtils.isExpired(
      requestData.refreshToken
    );
    if (isExpiredRefresh)
      throw new GlobalError(ErrorCodes.REFRESH_TOKEN_EXPIRED);

    const refreshTokenId = TokenUtils.extractId(requestData.refreshToken);
    const expireTimeRefreshToken = TokenUtils.extractExpiration(
      requestData.refreshToken
    );

    // Check refresh token has been mark to expired
    const isInvalidRefreshToken = await invalidTokenRepository.findOneBy({
      id: refreshTokenId,
    });
    if (isInvalidRefreshToken)
      throw new GlobalError(ErrorCodes.REFRESH_TOKEN_EXPIRED);

    // Get user
    const sub = TokenUtils.extractSubject(requestData.refreshToken);
    const identity = await userRepository.findOneBy({ slug: sub });
    if (!identity) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);

    // Generate new token and refresh token
    const result = {
      token: await this.createToken(identity, this._duration),
      refreshToken: await this.createToken(identity, this._refreshableDuration),
    };

    // Mark current refresh token is invalid
    const invalidToken: InvalidToken = {
      tokenId: refreshTokenId,
      expiryDate: expireTimeRefreshToken,
    };
    await invalidTokenRepository.createAndSave(invalidToken);

    return result;
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
  private async createToken(
    identity: User,
    expiryTime: string | number
  ): Promise<string> {
    return JWT.sign(
      {
        sub: identity.slug,
        scope: await this.buildScope(identity),
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
  private async buildScope(identity: User): Promise<string> {
    const user = await userRepository.findOne({
      where: { id: identity.id },
      relations: ["userRoles.role.rolePermissions.permission.authority"],
    });
    if (!user) return `[]`;
    if (!user.userRoles) return `[]`;
    const scope = user.userRoles
      .map((item) => item.role.nameNormalize)
      .filter((item): item is string => item !== undefined); // Filters out undefined results;

    return `[${scope.join(", ")}]`;
  }

  /**
   * Create a JWT token for the provided identity.
   * @param {User} identity
   * @returns {string} JWT token
   */
  public async generateToken(identity: User): Promise<{
    token: string;
    refreshToken: string;
  }> {
    return {
      token: await this.createToken(identity, this._duration),
      refreshToken: await this.createToken(identity, this._refreshableDuration),
    };
  }
}

export default new TokenService();
