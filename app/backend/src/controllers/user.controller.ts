import { TApiResponse } from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
class UserController {
  /**
   * @swagger
   * tags:
   *   - name: User
   *     description: The user managing API
   */

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users
   *     tags: [User]
   *     responses:
   *       200:
   *         description: Get all users successfully.
   *       500:
   *         description: Server error
   *
   */
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const response: TApiResponse<string[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "OK",
        method: req.method,
        path: req.originalUrl,
        result: [],
      };
      res.status(StatusCodes.OK).json(response);
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
