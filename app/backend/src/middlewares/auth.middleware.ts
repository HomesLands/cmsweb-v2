import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import _ from "lodash";

import { ErrorCodes, GlobalError } from "@exception";
import { env } from "@constants";
import { userRepository } from "@repositories";
import { StatusCodes } from "http-status-codes";

// public api
const publicAPI: string[] = ["/api/v1/users/test1"];

class AuthMiddleware {
  public authenticate(req: Request, res: Response, next: NextFunction) {
    // Check public APIs
    if (publicAPI.includes(req.originalUrl)) return next();

    // Get token
    const token = req.headers["authorization"] as string;
    if (!token) return next(new GlobalError(StatusCodes.UNAUTHORIZED));

    const authToken = token.split(" ")[1];
    JWT.verify(authToken, env.jwtSecret, async (err, decoded) => {
      if (err) return next(new GlobalError(StatusCodes.UNAUTHORIZED));
      if (typeof decoded === "object" && _.has(decoded, "id")) {
        // Get user
        const user = await userRepository.findOneBy({ id: decoded.id });
        if (!user) return next(new GlobalError(ErrorCodes.USER_NOT_FOUND));

        // Attached decoded user id to request
        Object.assign(req, { userId: user.id });
        next();
      } else {
        return next(new GlobalError(StatusCodes.UNAUTHORIZED));
      }
    });
  }

  public authorization(req: Request, res: Response, next: NextFunction) {
    next();
  }
}

export const authMiddleware = new AuthMiddleware();
