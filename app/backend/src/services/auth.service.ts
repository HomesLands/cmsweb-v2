import { Request } from "express";
import passport from "passport";

import { GlobalException } from "@exception/global-exception";
import { generateToken } from "@lib";
import { StatusResponseRecord } from "@exception/error-code";
import { IUser } from "@types";
import { AuthenticationResponseDto } from "@dto/response";

class AuthService {
  public async authenticate(req: Request): Promise<AuthenticationResponseDto> {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err: string, user: IUser) => {
        if (err)
          return reject(new GlobalException(StatusResponseRecord.UNAUTHORIZED));

        if (!user)
          return reject(
            new GlobalException(StatusResponseRecord.INVALID_USERNAME)
          );

        req.logIn(user, (err) => {
          if (err) {
            return reject(
              new GlobalException(StatusResponseRecord.SESSION_STORE_ERROR)
            );
          }

          if (!user.id) {
            return reject(
              new GlobalException(StatusResponseRecord.USER_ID_NOT_FOUND)
            );
          }

          return resolve({
            expireTime: new Date(),
            token: generateToken(user.id, "local"),
          });
        });
      })(req, null, null);
    });
  }
}

export default new AuthService();
