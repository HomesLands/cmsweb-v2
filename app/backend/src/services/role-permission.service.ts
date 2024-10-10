import { mapper } from "@mappers";
import {
  permissionRepository,
  rolePermissionRepository,
  roleRepository,
} from "@repositories";
import { RolePermissionResponseDto } from "@dto/response";
import { TCreateRolePermissionRequestDto } from "@types";
import { plainToClass } from "class-transformer";
import { CreateRolePermissionRequestDto } from "@dto/request";
import { validate } from "class-validator";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { RolePermission } from "@entities";

class RolePermissionService {
  public async createRolePermission(
    plainData: TCreateRolePermissionRequestDto
  ): Promise<RolePermissionResponseDto> {
    const requestData = plainToClass(CreateRolePermissionRequestDto, plainData);
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const role = await roleRepository.findOneBy({ slug: requestData.roleSlug });
    const permission = await permissionRepository.findOneBy({
      slug: requestData.permissionSlug,
    });

    if (!role) throw new GlobalError(ErrorCodes.ROLE_NOT_FOUND);
    if (!permission) throw new GlobalError(ErrorCodes.PERMISSION_NOT_FOUND);

    // Check existed
    const isExisted = await rolePermissionRepository.existsBy({
      role: { id: role.id },
      permission: { id: permission.id },
    });
    if (isExisted) throw new GlobalError(ErrorCodes.USER_ROLE_EXIST);

    const rolePermission = mapper.map(
      requestData,
      CreateRolePermissionRequestDto,
      RolePermission
    );
    Object.assign(rolePermission, { role, permission });

    const createdUserRole =
      await rolePermissionRepository.createAndSave(rolePermission);

    return mapper.map(
      createdUserRole,
      RolePermission,
      RolePermissionResponseDto
    );
  }
}

export default new RolePermissionService();
