import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { userService } from "@services";
import { TApiResponse, TPaginationOption } from "@types";
import { UserResponseDto } from "@dto/response";

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
   */
  public async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // const plainData = req.query;
      const results = await userService.getAllUsers({
        order: "DESC",
        skip: 0,
        take: 100,
      });
      const response: TApiResponse<UserResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get all users successfully",
        method: req.method,
        path: req.originalUrl,
        result: results,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
