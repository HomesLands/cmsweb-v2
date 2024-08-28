import { Request } from "express";
import passport from "passport";

import { UserRepository } from "@repositories";
import { IAuthenticateResponseDto } from "types";

class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // public async signUp(data: RegisterUserRequestDto): Promise<LoginResponseDto> {
  //   const passwordHashed: string = await bcrypt.hash(
  //     data.password,
  //     parseInt(env.token.hashSalt)
  //   );

  //   let userData = await this.userRepo.create({
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     userName: data.userName,
  //     password: passwordHashed,
  //   });

  //   // add token
  //   const token = generateToken(userData.id, "local");

  //   userData = await this.userRepo.findOneAndUpdateById(userData.id, {
  //     token,
  //   });
  //   const userDto: LoginResponseDto = mapper.map(
  //     userData,
  //     User,
  //     LoginResponseDto
  //   );
  //   return userDto;
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
