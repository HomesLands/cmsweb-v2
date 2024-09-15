import { TApiResponse } from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserResponseDto } from "@dto/response";
import userService from "@services/user.service";
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
      const users = await userService.getAllUsers();
      const response: TApiResponse<UserResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get all users successfully",
        method: req.method,
        path: req.originalUrl,
        result: users,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
