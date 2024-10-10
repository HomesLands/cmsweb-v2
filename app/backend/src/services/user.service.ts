import { mapper } from "@mappers";
import { Permission, User } from "@entities";
import {
  PermissionResponseDto,
  UserPermissionResponseDto,
  UserResponseDto,
} from "@dto/response";
import { userRepository } from "@repositories";
import {
  TPaginationOptionResponse,
  TQueryRequest,
  TUploadUserAvatarRequestDto,
  TUploadUserSignRequestDto,
} from "@types";
import { GlobalError, ErrorCodes } from "@exception";
import fileService from "./file.service";
import { Ability, MongoQuery } from "@casl/ability";
import { Action } from "@enums";
import { Subjects } from "@lib";
import { StatusCodes } from "http-status-codes";

class UserService {
  public async getAllUsers(
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<UserResponseDto[]>> {
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

    // Get the total number of roles
    const totalUsers = await userRepository.count();

    // Calculate pagination details
    const totalPages = Math.ceil(totalUsers / pageSize);

    const users = await userRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { createdAt: options.order },
      relations: [
        "userDepartments",
        "userDepartments.department",
        "userRoles.role",
      ],
    });
    const results = mapper.mapArray(users, User, UserResponseDto);
    return {
      items: results,
      page,
      pageSize,
      totalPages,
    };
  }

  public async getUser(
    userId?: string,
    ability?: Ability<[Action, Subjects], MongoQuery>
  ): Promise<UserResponseDto> {
    if (!ability) throw new GlobalError(StatusCodes.FORBIDDEN);

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
      relations: [
        "userDepartments",
        "userDepartments.department",
        "userDepartments.department.site",
        "userDepartments.department.site.company",
      ],
    });
    if (!user) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);

    // const hasAbility = ability.can(Action.READ, user);
    // if (!hasAbility) {
    //   throw new GlobalError(StatusCodes.FORBIDDEN);
    // }

    const results = mapper.map(user, User, UserResponseDto);
    return results;
  }

  public async getUserPermissions(
    userId: string
  ): Promise<UserPermissionResponseDto[]> {
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: [
        "userRoles.role.rolePermissions.permission.authority",
        "userRoles.role.rolePermissions.permission.resource",
      ],
    });
    if (!user?.userRoles) return [];
    const scope: UserPermissionResponseDto[] = user.userRoles
      .filter((item) => item.role && item.role.nameNormalize)
      .map((item) => {
        const permissions =
          item?.role?.rolePermissions?.map((item) =>
            mapper.map(item.permission, Permission, PermissionResponseDto)
          ) || [];

        return {
          role: item.role.nameNormalize,
          permissions,
        };
      });

    return scope;
  }

  public async uploadUserSignature(
    requestData: TUploadUserSignRequestDto
  ): Promise<UserResponseDto> {
    const user = await userRepository.findOneBy({ id: requestData.userId });
    if (!user) throw new GlobalError(ErrorCodes.FORBIDDEN_USER);

    const file = await fileService.uploadFile(requestData.file);

    // Remove old file
    const oldFile = user.signature;
    if (oldFile) await fileService.removeFileByName(oldFile);

    Object.assign(user, { signature: `${file.name}.${file.extension}` });
    const updatedUser = await userRepository.save(user);

    const userDto = mapper.map(updatedUser, User, UserResponseDto);
    return userDto;
  }

  public async uploadUserAvatar(
    requestData: TUploadUserAvatarRequestDto
  ): Promise<UserResponseDto> {
    console.log({ requestData });
    const user = await userRepository.findOne({
      where: {
        id: requestData.userId
      },
      relations: [
        'userDepartments.department.site.company'
      ]
    });
    if (!user) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);

    const file = await fileService.uploadFile(requestData.file);

    const oldFile = user.avatar;
    if (oldFile) await fileService.removeFileByName(oldFile);

    Object.assign(user, { avatar: `${file.name}.${file.extension}` });
    const updatedUser = await userRepository.save(user);

    const userDto = mapper.map(updatedUser, User, UserResponseDto);
    return userDto;
  }
}

export default new UserService();
