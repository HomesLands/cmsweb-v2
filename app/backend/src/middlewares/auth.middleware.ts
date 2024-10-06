import { Request, Response, NextFunction } from "express";
import { HTTPMethod } from "http-method-enum";
import _ from "lodash";
import { match } from "path-to-regexp";

import { GlobalError } from "@exception";
import { userRepository } from "@repositories";
import { StatusCodes } from "http-status-codes";
import { TokenUtils } from "@utils";

// Define a list of whitelisted routes with allowed methods
const whitelist = [
  { path: "/files/:id", method: HTTPMethod.GET },
  { path: "/auth/authenticate", method: HTTPMethod.POST },
  { path: "/auth/register", method: HTTPMethod.POST },
  { path: "/auth/refresh", method: HTTPMethod.POST },
  { path: "/auth/logout", method: HTTPMethod.POST },
  { path: "/healthCheck/status", method: HTTPMethod.GET },
  { path: "/errorCodes", method: HTTPMethod.GET },
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
    const isWhitelisted = whitelist.some((route) => {
      const matchPath = match(route.path, { decode: decodeURIComponent });
      return matchPath(req.path) && route.method === req.method;
    });

    if (isWhitelisted) return next(); // Skip authentication for whitelisted routes

    // Get token
    const token = req.headers["authorization"] as string;
    if (!token) return next(new GlobalError(StatusCodes.UNAUTHORIZED));

    const authToken = token.split(" ")[1];
    try {
      const isExpired = await TokenUtils.isExpired(authToken);
      if (isExpired) throw new GlobalError(StatusCodes.UNAUTHORIZED);

      // Get user
      const sub = TokenUtils.extractSubject(authToken);
      const user = await userRepository.findOneBy({ slug: sub });
      if (!user) return next(new GlobalError(StatusCodes.UNAUTHORIZED));

      // Attached decoded user id to request
      Object.assign(req, { userId: user.id });
      next();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Middleware to check role of user.
   * @param {string} role
   * @returns {<(req: Request, res: Response, next: NextFunction) => void}
   */
  public hasRole(
    role: string
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      if (_.has(req, "userId")) {
        const userId = req.userId as string;
        userRepository
          .findOneBy({ id: userId })
          .then((user) => {
            if (!user) throw new GlobalError(StatusCodes.FORBIDDEN);

            // Get user role
            const hasRole = user.userRoles?.some((item) => {
              if (item.role.nameNormalize) {
                return item.role.nameNormalize === role;
              }
              return false;
            });
            if (!hasRole) throw new GlobalError(StatusCodes.FORBIDDEN);
            next();
          })
          .catch((error) => {
            next(error); // Pass errors to the next middleware
          });
      } else next(new GlobalError(StatusCodes.FORBIDDEN));
    };
  }

  /**
   * Middleware to check authorities of user.
   * @param {string[]} roles
   * @returns {<(req: Request, res: Response, next: NextFunction) => void}
   */
  public hasAnyRole(
    roles: string[]
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      if (_.has(req, "userId")) {
        const userId = req.userId as string;
        userRepository
          .findOneBy({ id: userId })
          .then((user) => {
            if (!user) throw new GlobalError(StatusCodes.FORBIDDEN);
            const hasRole = user.userRoles?.some((item) => {
              if (item.role.nameNormalize) {
                return roles.includes(item.role.nameNormalize);
              }
              return false;
            });
            if (!hasRole) throw new GlobalError(StatusCodes.FORBIDDEN);
            next();
          })
          .catch((error) => {
            next(error); // Pass errors to the next middleware
          });
      } else next(new GlobalError(StatusCodes.FORBIDDEN));
    };
  }

  /**
   * Middleware to check authorities of user.
   * @param {string} authority
   * @returns {<(req: Request, res: Response, next: NextFunction) => void}
   */
  public hasAuthority(
    authority: string
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      if (_.has(req, "userId")) {
        const userId = req.userId as string;

        // Find the user by ID using promise chaining
        userRepository
          .findOne({
            where: { id: userId },
            relations: [
              "userRoles",
              "userRoles.role",
              "userRoles.role.permissions",
              "userRoles.role.permissions.authority",
            ],
          })
          .then((user) => {
            if (!user) throw new GlobalError(StatusCodes.FORBIDDEN);

            const hasAuthority = user.userRoles?.some((userRole) => {
              const { permissions } = userRole.role;
              if (permissions) {
                return permissions.some(
                  (permission) =>
                    permission.authority?.nameNormalize === authority
                );
              }
              return false;
            });

            if (!hasAuthority) {
              throw new GlobalError(StatusCodes.FORBIDDEN);
            }
            next(); // Proceed if the user has the authority
          })
          .catch((error) => {
            next(error); // Pass errors to the next middleware
          });
      } else {
        next(new GlobalError(StatusCodes.FORBIDDEN)); // Pass errors to the next middleware
      }
    };
  }

  /**
   * Middleware to check authorities of user.
   * @param {string[]} authorities
   * @returns {<(req: Request, res: Response, next: NextFunction) => void}
   */
  public hasAnyAuthority(
    authorities: string[]
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      if (_.has(req, "userId")) {
        const userId = req.userId as string;

        // Find the user by ID using promise chaining
        userRepository
          .findOne({
            where: { id: userId },
            relations: [
              "userRoles",
              "userRoles.role",
              "userRoles.role.permissions",
              "userRoles.role.permissions.authority",
            ],
          })
          .then((user) => {
            if (!user) throw new GlobalError(StatusCodes.FORBIDDEN);

            const hasAnyAuthority = user.userRoles?.some((userRole) => {
              const { permissions } = userRole.role;
              if (permissions) {
                return permissions.some((permission) =>
                  authorities.some(
                    (authority) =>
                      permission.authority?.nameNormalize === authority
                  )
                );
              }
              return false;
            });

            if (!hasAnyAuthority) {
              throw new GlobalError(StatusCodes.FORBIDDEN);
            }
            next(); // Proceed if the user has the authority
          })
          .catch((error) => {
            next(error); // Pass errors to the next middleware
          });
      } else {
        next(new GlobalError(StatusCodes.FORBIDDEN)); // Pass errors to the next middleware
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();
