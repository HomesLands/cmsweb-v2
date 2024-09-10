import { Request } from "express";
import passport from "passport";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

import { generateToken } from "@lib";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { AuthenticationResponseDto } from "@dto/response";
import { RegistrationRequestDto } from "@dto/request";
import { userRepository } from "@repositories";
import { User } from "@entities";
import { validate } from "class-validator";
import { TRegistrationRequestDto } from "@types";
import { plainToClass } from "class-transformer";
import { mapper } from "@mappers";
import { env } from "@constants";

class AuthService {
  public async authenticate(req: Request): Promise<AuthenticationResponseDto> {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err: unknown, user: User | false) => {
        if (err) return reject(new GlobalError(StatusCodes.UNAUTHORIZED));

        if (!user) {
          return reject(new GlobalError(ErrorCodes.INVALID_USERNAME));
        }

        req.logIn(user, (err) => {
          if (err) {
            return reject(new GlobalError(ErrorCodes.SESSION_STORE_ERROR));
          }

          if (!user.id) {
            return reject(new GlobalError(ErrorCodes.USER_NOT_FOUND));
          }

          return resolve({
            expireTime: new Date(),
            token: generateToken(user.id, "local"),
          });
        });
      })(req, null, null);
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
}

export default new AuthService();
