import passport from "passport";
import { Request } from "express";

import { mapper } from '@mappers/mapper';
import { User } from '@entities/user.entity';
import { UserRepository } from '@repositories';
import jwtHelper from '@utils/jwt';
import bcrypt from 'bcrypt';
import { default as env } from "@configs/constants/env";

import { RegisterUserRequestDto } from '@dto/request/registerUserRequest.dto';
import { LoginResponseDto } from '@dto/response/loginResponse.dto';
import { UsersResponseDto } from '@dto/response/usersResponse.dto';


import { User as userType } from '@configs/passport/strategies/local.config';

class AuthService {
  private userRepo = new UserRepository();
  
  public async signUp(data: RegisterUserRequestDto): Promise<LoginResponseDto> {

    const passwordHashed: string = await bcrypt.hash(data.password,  parseInt(env().hashSalt));

    let userData = await this.userRepo.create({
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: passwordHashed,
    });

    // add token
    const token = jwtHelper.signToken(userData.id, 'local');

    userData = await this.userRepo.findOneAndUpdateById(userData.id, {
      token
    });
    const userDto: LoginResponseDto = mapper.map(userData, User, LoginResponseDto);
    return userDto;
  }

  public async signIn(req: Request): Promise<any> {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err: any, user:  Express.User, info: { message: any; }) => {
        if (err) {
          console.log("Lỗi ở đây 1", err);
          return reject(err);
        }

        if (!user) {
          return resolve({ 
            error: true,
            status: 401, 
            message: info.message || 'Authentication failed.',
            userData: {} as LoginResponseDto
          });
        }

        req.logIn(user, (err) => {
          if (err) {
            console.log("Lỗi ở đây 2", err);

            return reject(err);
          }

          const userDto: LoginResponseDto = mapper.map(user, User, LoginResponseDto);

          return resolve({ 
            error: false,
            status: 200, 
            message: 'Login successful', 
            userData: userDto 
          });
        });

      })(req, null, null);
    });
  }
}

export default new AuthService;