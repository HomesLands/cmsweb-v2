import { NextFunction, Request, Response } from "express";
import { generateToken } from "@lib/token";


class UserController {
  /**
   * @swagger
   * tags:
   *   - name: User
   *     description: User Control
   */
  public async firstC(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      if("userId" in req) {
        console.log("userrrr")
        console.log({userId: req["userId"]});
      }

      const a = generateToken("4160a259-1119-4e1c-bccb-2304270b77f7", "local");
      console.log({a})
      return res.status(200).json({success: "success"});
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
