import { NextFunction, Request, Response } from "express";

export default class UserController {
  /**
   * @swagger
   * tags:
   *   - name: User
   *     description: User Control
   */

  /**
   * @swagger
   * /api/v1/user/{id}:
   *   get:
   *     description: test user
   *     tags: [User]
   *     produces:  
   *       - application/json
   *       - multipart/form-data
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: user id
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Invalid request params
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Resource not found
   *     security:
   *          - auth: []
   */
  static async firstC (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const id = req.params.id;
      const obj = {
        id: 1,
        content: id,
      };
      res.status(200).json(obj);
    } catch (error) {
      next(error);
    }
  }
}