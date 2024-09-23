import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { plainToClass } from "class-transformer";
import _ from "lodash";
import moment from "moment";
import { validate } from "class-validator";

import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { AuthenticationResponseDto } from "@dto/response";
import {
  AuthenticationRequestDto,
  LogoutRequestDto,
  RefreshTokenRequestDto,
  RegistrationRequestDto,
} from "@dto/request";
import { invalidTokenRepository, userRepository } from "@repositories";
import { InvalidToken, User } from "@entities";
import {
  TAuthenticationRequestDto,
  TLogoutRequestDto,
  TRefreshTokenRequestDto,
  TRegistrationRequestDto,
} from "@types";
import { mapper } from "@mappers";
import { env } from "@constants";
import tokenService from "./token.service";
import { TokenUtils } from "@utils/token.util";

class AuthService {
  public async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<AuthenticationResponseDto> {
    // Validate the class instance
    const plainData = req.body as TAuthenticationRequestDto;
    const requestData = plainToClass(AuthenticationRequestDto, plainData);
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    return new Promise((resolve, reject) => {
      passport.authenticate("local", async (err: unknown, user?: User) => {
        if (!_.isEmpty(err))
          return reject(new GlobalError(StatusCodes.UNAUTHORIZED));

        if (_.isEmpty(user)) {
          return reject(new GlobalError(ErrorCodes.AUTHORITY_NOT_FOUND));
        }

        const { token, refreshToken } = await tokenService.generateToken(user);

        return resolve({
          token,
          refreshToken,
          expireTime: moment(TokenUtils.extractExpiration(token)).toString(), // Local date
          expireTimeRefreshToken: moment(
            TokenUtils.extractExpiration(refreshToken)
          ).toString(), // Local date
        });
      })(req, res, next);
    });
  }

  public async register(plainData: TRegistrationRequestDto): Promise<void> {
    // Map plain object to request dto
    const requestData = plainToClass(RegistrationRequestDto, plainData);

    // Validate the class instance
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    // Find exist
    const hasExisted = await userRepository.existsBy({
      username: requestData.username,
    });
    if (hasExisted) throw new GlobalError(ErrorCodes.USER_EXIST);

    // Create new account
    const user = mapper.map(requestData, RegistrationRequestDto, User);
    // Hash password
    const hashedPassword = await bcrypt.hash(
      requestData.password,
      env.hashSalt
    );
    user.password = hashedPassword;

    await userRepository.createAndSave(user);
  }

  public async refreshToken(
    plainData: TRefreshTokenRequestDto
  ): Promise<AuthenticationResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(RefreshTokenRequestDto, plainData);

    // Validate the class instance
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const { token, refreshToken } =
      await tokenService.refreshToken(requestData);

    return {
      token,
      refreshToken,
      expireTime: moment(TokenUtils.extractExpiration(token)).toString(),
      expireTimeRefreshToken: moment(
        TokenUtils.extractExpiration(token)
      ).toString(),
    };
  }

  public async logout(plainData: TLogoutRequestDto): Promise<void> {
    // Map plain object to request dto
    const requestData = plainToClass(LogoutRequestDto, plainData);

    // Validate the class instance
    const errors = await validate(requestData);
    console.log({ errors });
    if (errors.length > 0) throw new ValidationError(errors);

    // Mark token expire
    if (!(await TokenUtils.isExpired(requestData.token))) {
      const tokenId = TokenUtils.extractId(requestData.token);
      const expiryDate = TokenUtils.extractExpiration(requestData.token);
      const invalidToken = { tokenId, expiryDate } as InvalidToken;
      await invalidTokenRepository.createAndSave(invalidToken);
    }

    // Mark refresh token expire
    if (!(await TokenUtils.isExpired(requestData.refreshToken))) {
      const tokenId = TokenUtils.extractId(requestData.refreshToken);
      const expiryDate = TokenUtils.extractExpiration(requestData.refreshToken);
      const invalidToken = { tokenId, expiryDate } as InvalidToken;
      await invalidTokenRepository.createAndSave(invalidToken);
    }
  }
}

export default new AuthService();
