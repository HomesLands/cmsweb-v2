import { NextFunction, Request, Response } from 'express';

import { validateRequestData } from '@utils/request';
import { sendResponse } from '@utils/response';

import AuthService from '@services/auth.service';
import userService from "@services/user.service";

import { UsersResponseDto } from '@dto/response/usersResponse.dto';
import { RegisterUserRequestDto } from '@dto/request/registerUserRequest.dto';
import { LoginRequestDto } from '@dto/request/loginRequest.dto';

import { LoginResponseDto } from '@dto/response/loginResponse.dto';
import authService from '@services/auth.service';


class AuthController {
  /**
   * @swagger
   * tags:
   *   - name: Auth
   *     description: Auth Control
   */

  public async signIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const validateData = await validateRequestData<LoginRequestDto>(
        LoginRequestDto,
        req.body,
      );

      if(validateData.error) {
        return sendResponse<LoginRequestDto>(
          req,
          res,
          true,
          400,
          validateData.message,
          {} as LoginRequestDto
        );
      }

      const loginData = await AuthService.signIn(req);

      return sendResponse<LoginResponseDto>(
        req,
        res,
        loginData.error,
        loginData.status,
        loginData.message,
        loginData.userData
      );

    } catch (error) {
      next(error);
    }
  }

  public async signUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { body: data} = req;

      const validateData = await validateRequestData<RegisterUserRequestDto>(
        RegisterUserRequestDto,
        data
      );

      if(validateData.error) {
        return sendResponse<RegisterUserRequestDto>(
          req,
          res,
          true,
          400,
          validateData.message,
          {} as RegisterUserRequestDto
        );
      }
        
      const userData = await authService.signUp(validateData.dto);

      return sendResponse<LoginResponseDto>(
        req,
        res,
        false,
        200,
        "Thành công",
        userData
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController;