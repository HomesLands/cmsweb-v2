import { mapper } from "@mappers";
import { User } from "@entities";
import { UserResponseDto } from "@dto/response";
import { userRepository } from "@repositories";
import { TQueryRequest } from "@types";
import { logger } from "@lib/logger";

class UserService {
  public async getAllUsers(options: TQueryRequest): Promise<UserResponseDto[]> {
    // Parse and validate pagination parameters
    let pageSize =
      typeof options.pageSize === "string"
        ? parseInt(options.pageSize, 10)
        : options.pageSize;
    let page =
      typeof options.page === "string"
        ? parseInt(options.page, 10)
        : options.page;

    // Ensure page and pageSize are positive numbers
    if (isNaN(page) || page <= 0) page = 1;
    if (isNaN(pageSize) || pageSize <= 0) pageSize = 10; // Default pageSize if invalid

    const users = await userRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
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
