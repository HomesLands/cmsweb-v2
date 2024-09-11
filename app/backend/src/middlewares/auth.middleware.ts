import { Request, Response, NextFunction } from "express";
import { HTTPMethod } from "http-method-enum";
import _ from "lodash";

import { GlobalError } from "@exception";
import { userRepository } from "@repositories";
import { StatusCodes } from "http-status-codes";
import { TokenUtils } from "@utils";

// Define a list of whitelisted routes with allowed methods
const whitelist = [
  { path: "/auth/authenticate", method: HTTPMethod.POST },
  { path: "/auth/register", method: HTTPMethod.POST },
  { path: "/auth/refresh", method: HTTPMethod.POST },
];

class AuthMiddleware {
  public async authenticate(req: Request, res: Response, next: NextFunction) {
    // Skip if preflight request
    if (req.method === HTTPMethod.OPTIONS) return next();

    // Check if the current request matches any whitelisted route and method
    const isWhitelisted = whitelist.some(
      (route) => route.path === req.path && route.method === req.method
    );
    if (isWhitelisted) return next(); // Skip authentication for whitelisted routes

    // Get token
    const token = req.headers["authorization"] as string;
    if (!token) return next(new GlobalError(StatusCodes.UNAUTHORIZED));

    const authToken = token.split(" ")[1];
    try {
      // Get user
      const sub = TokenUtils.extractSubject(authToken);
      const user = await userRepository.findOneBy({ id: sub });
      if (!user) return next(new GlobalError(StatusCodes.UNAUTHORIZED));

      // Attached decoded user id to request
      Object.assign(req, { userId: user.id });
      next();
    } catch (error) {
      next(error);
    }
  }

  public async authorize(req: Request, res: Response, next: NextFunction) {
    // const id = req.userId
    if (_.has(req, "userId")) {
      const userId = req.userId as string;
      const user = await userRepository.findOneBy({ id: userId });

      return next();
    }
    return next(new GlobalError(StatusCodes.FORBIDDEN));
  }
}

export const authMiddleware = new AuthMiddleware();
