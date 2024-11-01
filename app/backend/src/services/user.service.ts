import { mapper } from "@mappers";
import { Permission, User } from "@entities";
import {
  PermissionResponseDto,
  UserPermissionResponseDto,
  UserResponseDto,
} from "@dto/response";
import { userRepository } from "@repositories";
import {
  TChangePasswordRequestDto,
  TPaginationOptionResponse,
  TQueryRequest,
  TUpdateUserInfoRequestDto,
  TUpdateUsernameRequestDto,
  TUploadUserAvatarRequestDto,
  TUploadUserSignRequestDto,
} from "@types";
import { GlobalError, ErrorCodes } from "@exception";
import fileService from "./file.service";
import { Ability, MongoQuery } from "@casl/ability";
import { Action } from "@enums";
import { Subjects } from "@lib";
import { StatusCodes } from "http-status-codes";
import { parsePagination } from "@utils/pagination.util";
import { plainToClass } from "class-transformer";
import {
  ChangePasswordRequestDto,
  UpdateUserInfoRequestDto,
  UpdateUsernameRequestDto,
} from "@dto/request";
import { validate } from "class-validator";
import { ValidationError } from "exception";
import bcrypt from "bcryptjs";
import { env } from "@constants";

class UserService {
  public async getAllUsers(
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<UserResponseDto[]>> {
    // Parse and validate pagination parameters
    const { page, pageSize } = parsePagination(options);

    // Get the total number of roles
    const totalUsers = await userRepository.count();

    // Calculate pagination details
    const totalPages = Math.ceil(totalUsers / pageSize);

    const users = await userRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { createdAt: options.order },
      relations: ["userDepartments.department", "userRoles.role"],
    });

    console.log({ users });
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
      relations: ["userDepartments.department.site.company"],
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
    if (!user) throw new GlobalError(StatusCodes.FORBIDDEN);

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
    const user = await userRepository.findOne({
      where: {
        id: requestData.userId,
      },
      relations: ["userDepartments.department.site.company"],
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

  public async changePassword(
    userId: string,
    plainData: TChangePasswordRequestDto
  ): Promise<UserResponseDto> {
    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user?.password) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);

    // Check current password
    const requestData = plainToClass(ChangePasswordRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    // Validate current passs
    const isValid = await bcrypt.compare(
      requestData.currentPassword,
      user.password
    );

    if (!isValid) throw new GlobalError(ErrorCodes.PASSWORD_NOT_MATCH);

    // Validate new pass
    if (requestData.newPassword !== requestData.confirmPassword)
      throw new GlobalError(ErrorCodes.CONFIRM_PASSWORD_NOT_MATCH);

    // Change pass
    const newHashedPassword = await bcrypt.hash(
      requestData.newPassword,
      env.hashSalt
    );

    Object.assign(user, { password: newHashedPassword });
    const updatedUser = await userRepository.save(user);

    const userDto = mapper.map(updatedUser, User, UserResponseDto);
    return userDto;
  }

  public async updateUserInfo(
    plainData: TUpdateUserInfoRequestDto
  ): Promise<UserResponseDto> {
    // Check current password
    const requestData = plainToClass(UpdateUserInfoRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const user = await userRepository.findOne({
      where: {
        id: requestData.userId,
      },
    });
    if (!user) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);

    Object.assign(user, requestData);
    const updatedUser = await userRepository.save(user);

    const userDto = mapper.map(updatedUser, User, UserResponseDto);
    return userDto;
  }

  public async updateUsername(plainData: TUpdateUsernameRequestDto) {
    // Check current password
    const requestData = plainToClass(UpdateUsernameRequestDto, plainData);
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const user = await userRepository.findOne({
      where: {
        slug: requestData.userSlug,
      },
    });

    if (!user) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);

    Object.assign(user, { username: requestData.username });
    const updatedUser = await userRepository.save(user);

    const userDto = mapper.map(updatedUser, User, UserResponseDto);
    return userDto;
  }

  public async deleteUser(
    slug: string
  ): Promise<number> {
    const user = await userRepository.findOneBy({ slug });

    if(!user) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);

    const deleted = await userRepository.softDelete({ slug });
    return deleted.affected || 0;
  }
}

export default new UserService();
