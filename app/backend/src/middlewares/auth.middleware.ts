import { Request, Response, NextFunction } from "express";
import { HTTPMethod } from "http-method-enum";
import { match } from "path-to-regexp";

import { GlobalError } from "@exception";
import { userRepository } from "@repositories";
import { StatusCodes } from "http-status-codes";
import { TokenUtils } from "@utils";
import { createAbilities } from "@lib";
import { asl } from "@configs";
import { Action } from "@enums";

// Define a list of whitelisted routes with allowed methods
const whitelist = [
  { path: "/files/:name", method: HTTPMethod.GET },
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
      const user = await userRepository.findOne({
        where: { slug: sub },
        relations: [
          "userRoles.role.rolePermissions.permission.authority",
          "userRoles.role.rolePermissions.permission.resource",
        ],
      });

      if (!user?.id) return next(new GlobalError(StatusCodes.UNAUTHORIZED));

      const ability = await createAbilities(user);

      // Attached decoded user id to request
      Object.assign(req, { userId: user.id, ability });
      asl.run({ userId: user.id }, () => {});
      next();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Middleware to check user permission.
   * @param {Action} action
   * @param {any} entity
   * @returns {<(req: Request, res: Response, next: NextFunction) => void}
   */
  public hasPermission(
    action: Action,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entity: any
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.ability) throw new GlobalError(StatusCodes.FORBIDDEN);
      console.log(`[${AuthMiddleware.name}]`, { ability: req.ability });

      // Check permission
      const canPerformAction = req.ability.can(action, entity);

      if (!canPerformAction) next(new GlobalError(StatusCodes.FORBIDDEN));
      next();
    };
  }
}

export const authMiddleware = new AuthMiddleware();
