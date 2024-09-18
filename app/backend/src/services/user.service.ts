import { mapper } from "@mappers";
import { User } from "@entities";
import { UserResponseDto } from "@dto/response";
import { userRepository } from "@repositories";
import { TPaginationOptionRequest } from "@types";
import { logger } from "@lib/logger";

class UserService {
  public async getAllUsers(
    options: TPaginationOptionRequest
  ): Promise<UserResponseDto[]> {
    const users = await userRepository.find({
      take: options.take,
      skip: options.skip,
      order: { createdAt: options.order },
    });
    logger.info(UserService.name, { users });
    const results = mapper.mapArray(users, User, UserResponseDto);
    return results;
  }

  public async getUserBySlug(slug: string): Promise<UserResponseDto> {
    const user = await userRepository.findOneBy({
      slug,
    });
    const results = mapper.map(user, User, UserResponseDto);
    return results;
  }
}

export default new UserService();
