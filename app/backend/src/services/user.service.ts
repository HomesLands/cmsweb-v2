import { UserRepository } from "@repositories";
import { mapper } from "@mappers/mapper";
import { User } from "@entities/user.entity";
import { UsersResponseDto } from "@dto/response/usersResponse.dto";

interface dataRegister {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

class UserService {
  private userRepo = new UserRepository();

  public async createUser(data: dataRegister): Promise<UsersResponseDto> {
    console.log({ dataRegisterService: data });
    let userData = await this.userRepo.create({
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: data.password,
    });

    console.log({ userData });
    const userDto: UsersResponseDto = mapper.map(
      userData,
      User,
      UsersResponseDto
    );
    console.log({ userDto });
    return userDto;
  }

  public async getUserById(id: string): Promise<UsersResponseDto> {
    let userData = await this.userRepo.findOneBy({ id: id });
    const userDto: UsersResponseDto = mapper.map(
      userData,
      User,
      UsersResponseDto
    );
    return userDto;
  }
}

export const userService = new UserService();
