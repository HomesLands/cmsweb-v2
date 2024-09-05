import { Request } from "express";
import passport from "passport";
import { StatusCodes } from "http-status-codes";

import { generateToken, logger } from "@lib";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { AuthenticationResponseDto } from "@dto/response";
import { RegistrationRequestDto } from "@dto/request";
import { userRepository } from "@repositories";
import { User } from "@entities";
import { validate } from "class-validator";

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

  public async register(requestData: RegistrationRequestDto): Promise<void> {
    // Validation
    const registrationDto = new RegistrationRequestDto();
    registrationDto.username = requestData.username;
    registrationDto.password = requestData.password;
    registrationDto.firstName = requestData.firstName;
    registrationDto.lastName = requestData.lastName;

    // Validate the class instance
    const errors = await validate(registrationDto);
    if (errors.length > 0) throw new ValidationError(errors);

    // Find exist
    const hasExisted = await userRepository.existsBy({
      username: requestData.username,
    });
    if (hasExisted) throw new GlobalError(ErrorCodes.USER_EXIST);
    // Create new account
    const user: User = {
      firstName: requestData.firstName,
      lastName: requestData.lastName,
      username: requestData.username,
      password: requestData.password,
      dob: "1998/02/20",
    };
    await userRepository.createAndSave(user);
  }
}

export default new AuthService();
