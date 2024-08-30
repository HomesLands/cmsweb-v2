import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

import { GlobalException } from "@exception/global-exception";
import { StatusResponseRecord } from "@exception/error-code";
import { env } from "@constants";
import userService from "@services/user.service";
import { UserResponseDto } from "@dto/response/user.response.dto"

// public api
const publicApis: string[] = [
  "/api/v1/users/test1"
];

class AuthMiddleware {
  public authenticate(req: Request, res: Response, next: NextFunction) {
    if (publicApis.includes(req.originalUrl)) {
      return next();
    }

    const token = req.headers["authorization"];
    if(token) {
      const authToken = (<string>token).split(" ")[1];
      JWT.verify(authToken, env.token.jwtSecret, async (err, decoded) => {
        if (err) {
          return next(new GlobalException(StatusResponseRecord.UNAUTHORIZED));
        } else {
          if (typeof decoded === "object" && "id" in decoded) {
            const userData: UserResponseDto | null = await userService.getUserById(decoded.id);
            if(!userData) {
              return next(new GlobalException(StatusResponseRecord.USER_NOT_FOUND));
            }
            // Attached decoded user id to request
            Object.assign(req, { userId: userData.id});
            next();
          } else {
            return next(new GlobalException(StatusResponseRecord.UNAUTHORIZED));
          }
        }
      });
    } else {
      return next(new GlobalException(StatusResponseRecord.UNAUTHORIZED));
    }
  }

  public authorization(req: Request, res: Response, next: NextFunction) {
    next();
  }
}

export const authMiddleware = new AuthMiddleware();
