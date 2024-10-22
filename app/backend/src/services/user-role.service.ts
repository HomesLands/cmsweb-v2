import { mapper } from "@mappers";
import {
  roleRepository,
  userRepository,
  userRoleRepository,
} from "@repositories";
import { UserRoleResponseDto } from "@dto/response";
import { TCreateUserRoleRequestDto } from "@types";
import { plainToClass } from "class-transformer";
import { CreateUserRoleRequestDto } from "@dto/request";
import { validate } from "class-validator";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { UserRole } from "@entities";

class UserRoleService {
  public async createUserRole(
    plainData: TCreateUserRoleRequestDto
  ): Promise<UserRoleResponseDto> {
    const requestData = plainToClass(CreateUserRoleRequestDto, plainData);
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const role = await roleRepository.findOneBy({ slug: requestData.roleSlug });
    const user = await userRepository.findOneBy({ slug: requestData.userSlug });

    if (!role) throw new GlobalError(ErrorCodes.ROLE_NOT_FOUND);
    if (!user) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);

    // Check existed
    const isExisted = await userRoleRepository.exists({
      where: {
        user: { id: user.id },
        role: { id: role.id },
      },
    });

    if (isExisted) throw new GlobalError(ErrorCodes.USER_ROLE_EXIST);

    const userRole = new UserRole();
    userRole.user = user;
    userRole.role = role;

    const createdUserRole = await userRoleRepository.createAndSave(userRole);

    return mapper.map(createdUserRole, UserRole, UserRoleResponseDto);
  }

  public async deleteUserRole(slug: string) {
    const userRole = await userRoleRepository.findOne({
      where: { slug },
    });
    if (!userRole) throw new GlobalError(ErrorCodes.USER_ROLE_NOT_FOUND);

    const deleted = await userRoleRepository.softDelete({ slug });
    return deleted.affected || 0;
  }
}

export default new UserRoleService();
