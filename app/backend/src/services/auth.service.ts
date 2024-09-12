import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

import { logger } from "@lib";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { AuthenticationResponseDto } from "@dto/response";
import {
  AuthenticationRequestDto,
  RefreshTokenRequestDto,
  RegistrationRequestDto,
} from "@dto/request";
import { userRepository } from "@repositories";
import { User } from "@entities";
import { validate } from "class-validator";
import {
  TAuthenticationRequestDto,
  TRefreshTokenRequestDto,
  TRegistrationRequestDto,
} from "@types";
import { plainToClass } from "class-transformer";
import { mapper } from "@mappers";
import { env } from "@constants";
import _ from "lodash";
import tokenService from "./token.service";
import { TokenUtils } from "@utils/token.util";
import moment from "moment";

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
      passport.authenticate("local", (err: unknown, user?: User) => {
        if (!_.isEmpty(err))
          return reject(new GlobalError(StatusCodes.UNAUTHORIZED));

        if (!user?.id) {
          return reject(new GlobalError(ErrorCodes.USER_NOT_FOUND));
        }

        const token = tokenService.generateToken(user);
        const expireTime = TokenUtils.extractExpiration(token);
        logger.info(expireTime.toString());

        return resolve({
          expireTime: moment(TokenUtils.extractExpiration(token)).toString(), // Local date
          token,
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

    const newToken = await tokenService.refreshToken(requestData.token);

    return {
      token: newToken,
      expireTime: moment(TokenUtils.extractExpiration(newToken)).toString(),
    };
  }
}

export default new AuthService();
