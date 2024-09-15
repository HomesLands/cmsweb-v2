import { userRepository } from "@repositories";
import { mapper } from "@mappers";
import { User } from "@entities";
import { UserResponseDto } from "@dto/response";

class UserService {
  public async getUserById(id: string): Promise<UserResponseDto | null> {
    const userData = await userRepository.findOneBy({ id });
    if (!userData) {
      return null;
    }
    const userDto: UserResponseDto = mapper.map(
      userData,
      User,
      UserResponseDto
    );
    return userDto;
  }

  public async getAllUsers(): Promise<UserResponseDto[] | []> {
    const users = await userRepository.findAllUsers();

    const usersDto = mapper.mapArray(users, User, UserResponseDto);

    return usersDto;
  }
}

export default new UserService();
