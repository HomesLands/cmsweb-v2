import { NextFunction, Request, Response } from "express";
import { plainToClass } from 'class-transformer';

import FileUploadService from "@services/image.service";
import userService from "@services/user.service";
import { UsersResponseDto } from '@dto/response/usersResponse.dto';



interface dataRegister {
  fistName: string;
  lastName: string;
  userName: string;
  password: string;
}

class UserController {
  /**
   * @swagger
   * tags:
   *   - name: User
   *     description: User Control
   */

  

  public async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // const { body: data} = req;
      const data = req.body;
      console.log({dataRegister: data});
      const userData = await userService.createUser(data);

      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  public async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const id = req.params.id;
      const userData = await userService.getUserById(id);

      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

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
  public async firstC (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const id: string = req.params.id;
      const obj = {
        id: 1,
        content: id,
      };
      res.status(200).json(obj);
    } catch (error) {
      next(error);
    }
  }

  public async uploadTestSaveLocal (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const isMultiple: boolean = true;
    try {
      const validate = await FileUploadService.validateFiles(req, res, isMultiple);
      console.log({validate})
      if(validate.success) {
        const b = await FileUploadService.uploadFilesLocal(req, res, isMultiple);
        if(!b.success) {
          res.status(400).json({ error: "Lỗi lưu file"});
        }
      } else {
        res.status(400).json({ error: "Lỗi validate file"});
      }

      res.status(200).json({ success: "success"});
    } catch (error) {
      next(error);
    }
  }

  public async uploadTestSaveDB (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const isMultiple: boolean = true;
    try {
      const validate = await FileUploadService.validateFiles(req, res, isMultiple);
      console.log({validate})
      if(validate.success) {
        console.log("Thành công")
        const b = await FileUploadService.uploadFilesDB(req, res, isMultiple);
        if(!b.success) {
          res.status(400).json({ error: "Lỗi lưu file"});
        }
      } else {
        res.status(400).json({ error: "Lỗi validate file"});
      }

      res.status(200).json({ success: "success"});
    } catch (error) {
      next(error);
    }
  }

  public async getImage (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const bufferImg = await FileUploadService.getImgFromDB(req.params.id);
      // res.setHeader('Content-Type', 'image/jpeg'); 
      res.setHeader('Content-Type', 'image/jpg'); 
      // res.setHeader('Content-Type', imageData.mimeType || 'application/octet-stream');

      res.end(bufferImg);
      // res.end(bufferImg);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();