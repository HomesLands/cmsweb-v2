import { Request, Response, NextFunction } from "express";
import { HTTPMethod } from "http-method-enum";
import _ from "lodash";

import { ErrorCodes, GlobalError } from "@exception";
import { userRepository } from "@repositories";
import { StatusCodes } from "http-status-codes";
import { TokenUtils } from "@utils";
import tokenService from "@services/token.service";

// Define a list of whitelisted routes with allowed methods
const whitelist = [
  { path: "/auth/authenticate", method: HTTPMethod.POST },
  { path: "/auth/register", method: HTTPMethod.POST },
  { path: "/auth/refresh", method: HTTPMethod.POST },
  { path: "/healthCheck/status", method: HTTPMethod.GET },
];

class AuthMiddleware {
  /**
   * Determines whether users are who they claim to be
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      const isExpired = TokenUtils.isExpired(authToken);
      if (isExpired) throw new GlobalError(StatusCodes.UNAUTHORIZED);

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

  /**
   * Middleware to check authorities of user.
   * @param {string[]} roles
   * @returns {Promise<(req: Request, res: Response, next: NextFunction) => void}
   */
  public async hasRole(
    roles: string[]
  ): Promise<(req: Request, res: Response, next: NextFunction) => void> {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  /**
   * Middleware to check authorities of user.
   * @param {string[]} authorities
   * @returns {Promise<(req: Request, res: Response, next: NextFunction) => void}
   */
  public async hasAuthority(
    authorities: string[]
  ): Promise<(req: Request, res: Response, next: NextFunction) => void> {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  /**
   * Middleware to check authorities of user.
   * @param {string} role
   * @param {string[]} authorities
   * @returns {Promise<(req: Request, res: Response, next: NextFunction) => void}
   */
  public async hasPermission(
    role: string,
    authorities: string[]
  ): Promise<(req: Request, res: Response, next: NextFunction) => void> {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (_.has(req, "permissions") && _.isArray(req.permissions)) {
          const hasPermission = req.permissions.some((permission) => {
            return (
              permission.role === role &&
              authorities.every((authority: string) =>
                permission.authorities.includes(authority)
              )
            );
          });
          if (!hasPermission) {
            return next(new GlobalError(StatusCodes.FORBIDDEN));
          }
          next();
        }
      } catch (error) {
        next(error);
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();
