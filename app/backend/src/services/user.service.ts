import { UserRepository } from "@repositories";
import { mapper } from "@mappers/mapper";
import { User } from "@entities";
import { UserResponseDto } from "@dto/response";
import { ICreateUserRequestDto } from "types";

class UserService {
  // private userRepo = new UserRepository();
  // public async createUser(
  //   requestData: ICreateUserRequestDto
  // ): Promise<UserResponseDto> {
  //   let userData = await this.userRepo.create({
  //     firstName: requestData.firstName,
  //     lastName: requestData.lastName,
  //     userName: requestData.username,
  //     password: requestData.password,
  //   });
  //   const userDto: UserResponseDto = mapper.map(
  //     userData,
  //     User,
  //     UserResponseDto
  //   );
  //   return userDto;
  // }
  // public async getUserById(id: string): Promise<UserResponseDto> {
  //   // let userData = await this.userRepo.findOneBy({ id: id });
  //   // const userDto: UserResponseDto = mapper.map(
  //   //   userData,
  //   //   User,
  //   //   UserResponseDto
  //   // );
  //   // if(!userData) {
  //   //   return null;
  //   // }
  //   // const userDto = mapper.map(userData, User, UsersResponseDto);
  //   // return userDto;
  //   return new Promise((reslove) => {
  //     const user: UserResponseDto = {
  //       firstName: "",
  //       fullName: "",
  //       id: "",
  //       lastName: "",
  //       username: "",
  //     };
  //     reslove(user);
  //   });
  // }
  // public async getUserByUserName(userName: string): Promise<any | null> {
  //   let userData = await this.userRepo.findOneBy({ userName: userName });
  //   return userData;
  // }
}

export default new UserService();
