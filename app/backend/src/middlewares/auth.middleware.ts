import { Request, Response, NextFunction } from "express";

class AuthMiddleware {
  public authenticate(req: Request, res: Response, next: NextFunction) {
    next();
  }

  public authorization(req: Request, res: Response, next: NextFunction) {
    next();
  }
}

export const authMiddleware = new AuthMiddleware();
