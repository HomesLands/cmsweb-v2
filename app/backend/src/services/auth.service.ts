import { Request } from "express";
import passport from "passport";
import bcrypt from 'bcrypt';

import { UserRepository } from "@repositories";
import { IAuthenticateResponseDto } from "types";
import { User } from "@entities";
import { SaveOptions, RemoveOptions } from "typeorm";

class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // public async signUp(data: any): Promise<User> {

  //   const passwordHashed: string = await bcrypt.hash(
  //     data.password,
  //     10
  //   );

  //   let userData = await this.userRepository.save({
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     username: data.userName,
  //     password: passwordHashed,
  //     hasId: function (): boolean {
  //       throw new Error("Function not implemented.");
  //     },
  //     save: function (options?: SaveOptions): Promise<User> {
  //       throw new Error("Function not implemented.");
  //     },
  //     remove: function (options?: RemoveOptions): Promise<User> {
  //       throw new Error("Function not implemented.");
  //     },
  //     softRemove: function (options?: SaveOptions): Promise<User> {
  //       throw new Error("Function not implemented.");
  //     },
  //     recover: function (options?: SaveOptions): Promise<User> {
  //       throw new Error("Function not implemented.");
  //     },
  //     reload: function (): Promise<void> {
  //       throw new Error("Function not implemented.");
  //     }
  //   });

  //   return userData;
  // }

  public async authenticate(req: Request): Promise<IAuthenticateResponseDto> {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "local",
        (err: any, user: Express.User, info: { message: any }) => {
          if (err) return reject(err);

          if (!user) return reject(new Error("User not found"));

          req.logIn(user, (err) => {
            if (err) {
              console.log({ err });
              return reject(err);
            }

            return resolve({ expireTime: new Date(), token: "" });
          });
        }
      )(req, null, null);
    });
  }
}

export default new AuthService();
