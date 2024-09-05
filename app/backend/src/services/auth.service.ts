import { Request } from "express";
import passport from "passport";
import { StatusCodes } from "http-status-codes";

import { generateToken } from "@lib";
import { ErrorCodes, GlobalException } from "@exception";
import { AuthenticationResponseDto } from "@dto/response";
import { RegistrationRequestDto } from "@dto/request";
import { userRepository } from "@repositories";
import { User } from "@entities";

class AuthService {
  public async authenticate(req: Request): Promise<AuthenticationResponseDto> {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err: unknown, user: User | false) => {
        if (err) return reject(new GlobalException(StatusCodes.UNAUTHORIZED));

        return resolve({
          expireTime: new Date(),
          // token: generateToken(user.id, "local"),
          token: "12345",
        });

        // if (!user) {
        //   return reject(new GlobalException(ErrorCodes.INVALID_USERNAME));
        // }

        // req.logIn(user, (err) => {
        // if (err) {
        //   return reject(new GlobalException(ErrorCodes.SESSION_STORE_ERROR));
        // }

        // if (!user.id) {
        //   return reject(new GlobalException(ErrorCodes.USER_NOT_FOUND));
        // }

        // return resolve({
        //   expireTime: new Date(),
        //   // token: generateToken(user.id, "local"),
        //   token: "12345",
        // });
        // });
      })(req, null, null);
    });
  }

  public async register(requestData: RegistrationRequestDto): Promise<void> {
    // Validation
    // Find exist
    const hasExisted = await userRepository.existsBy({
      username: requestData.username,
    });
    // if (hasExisted) throw GlobalException(ErrorCodes. );
    // Check password
    // Create new account
  }
}

export default new AuthService();
