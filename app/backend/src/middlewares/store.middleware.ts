import { asl } from "@configs";
import { Request, Response, NextFunction } from "express";

class StoreMiddleware {
  handler(req: Request, res: Response, next: NextFunction) {
    asl.run({ userId: req.userId }, () => {
      next();
    });
  }
}

export const storeMiddleware = new StoreMiddleware();
