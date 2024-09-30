import { mapper } from "@mappers";
import { User } from "@entities";
import { UserPermissionResponseDto, UserResponseDto } from "@dto/response";
import { userRepository } from "@repositories";
import { TQueryRequest } from "@types";
import { GlobalError, ErrorCodes } from "@exception";

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
      relations: [
        'userDepartments',
        'userDepartments.department',
      ]
    });
    const results = mapper.mapArray(users, User, UserResponseDto);
    return results;
  }

  public async getUser(userId: string): Promise<UserResponseDto> {
    const user = await userRepository.findOne({
      where: {
        id: userId
      },
      relations: [
        'userDepartments',
        'userDepartments.department',
        'userDepartments.department.site',
        'userDepartments.department.site.company',
      ]
    });
    if (!user) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);

    const results = mapper.map(user, User, UserResponseDto);
    return results;
  }
  public async getUserPermissions(
    userId: string
  ): Promise<UserPermissionResponseDto[]> {
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: [
        "userRoles",
        "userRoles.role",
        "userRoles.role.permissions",
        "userRoles.role.permissions.authority",
      ],
    });
    if (!user) return [];
    if (!user.userRoles) return [];
    const scope: UserPermissionResponseDto[] = user.userRoles
      .map((item) => {
        if (!item.role || !item.role.nameNormalize) return undefined; // Skip items without a role or nameNormalize

        const authorities: string[] = item.role.permissions
          .map((permission) => permission.authority?.nameNormalize)
          .filter((name): name is string => name !== undefined); // Filters out undefined values

        return {
          role: item.role.nameNormalize,
          authorities,
        };
      })
      .filter(
        (item): item is { role: string; authorities: string[] } =>
          item !== undefined
      ); // Filters out undefined results

    return scope;
  }
}

export default new UserService();
