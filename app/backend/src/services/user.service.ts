import { UserRepository } from "@repositories";
import { mapper } from "@mappers/mapper";
import { User } from "@entities";
import { UserResponseDto } from "@dto/response";
import { ICreateUserRequestDto } from "types";
import { SaveOptions, RemoveOptions } from "typeorm";

class UserService {
  private userRepo = new UserRepository();
  // public async createUser(
  //   requestData: ICreateUserRequestDto
  // ): Promise<UserResponseDto> {
  //   let userData: User = await this.userRepo.save({
  //     firstName: requestData.firstName,
  //     lastName: requestData.lastName,
  //     username: requestData.username,
  //     password: requestData.password,
  //   });
  //   const userDto: UserResponseDto = mapper.map(
  //     userData,
  //     User,
  //     UserResponseDto
  //   );
  //   return userDto;
  // }
  public async getUserById(id: string): Promise<UserResponseDto | null> {
    let userData = await this.userRepo.findById(id);
    if(!userData) {
      return null;
    }
    const userDto: UserResponseDto = mapper.map(
      userData,
      User,
      UserResponseDto
    );
    return userDto;
  }

  public async getUserByUserName(username: string): Promise<User | null> {
    return await this.userRepo.findOnByUsername(username);
  }
}

export default new UserService();
