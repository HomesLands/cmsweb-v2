import { userRepository } from "@repositories";
import { mapper } from "@mappers/mapper";
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
}

export default new UserService();
