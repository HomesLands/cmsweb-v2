import { mapper } from "@mappers";
import {
  permissionRepository,
  rolePermissionRepository,
  roleRepository,
} from "@repositories";
import { RolePermissionResponseDto } from "@dto/response";
import {
  TCreateRolePermissionRequestDto,
  TUpdateRolePermissionRequestDto,
} from "@types";
import { plainToClass } from "class-transformer";
import {
  CreateRolePermissionRequestDto,
  UpdateRolePermissionRequestDto,
} from "@dto/request";
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

  public async getRolePermission(
    slug: string
  ): Promise<RolePermissionResponseDto> {
    const rolePermission = await rolePermissionRepository.findOne({
      where: {
        slug,
      },
      relations: ["role", "permission"],
    });
    if (!rolePermission)
      throw new GlobalError(ErrorCodes.ROLE_PERMISSION_NOT_FOUND);

    return mapper.map(
      rolePermission,
      RolePermission,
      RolePermissionResponseDto
    );
  }

  public async updateRolePermission(
    plainData: TUpdateRolePermissionRequestDto
  ) {
    const requestData = plainToClass(UpdateRolePermissionRequestDto, plainData);
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const role = await roleRepository.findOneBy({ slug: requestData.roleSlug });
    const permission = await permissionRepository.findOneBy({
      slug: requestData.permissionSlug,
    });

    if (!role) throw new GlobalError(ErrorCodes.ROLE_NOT_FOUND);
    if (!permission) throw new GlobalError(ErrorCodes.PERMISSION_NOT_FOUND);

    const isExisted = await rolePermissionRepository.findOne({
      where: {
        role: {
          id: role.id,
        },
        permission: {
          id: permission.id,
        },
      },
    });
    if (isExisted) throw new GlobalError(ErrorCodes.ROLE_PERMISSION_EXIST);

    const rolePermission = await rolePermissionRepository.findOne({
      where: { slug: requestData.slug },
    });
    if (!rolePermission)
      throw new GlobalError(ErrorCodes.ROLE_PERMISSION_NOT_FOUND);

    Object.assign(rolePermission, {
      role,
      permission,
    });
    const updated = await rolePermissionRepository.save(rolePermission);

    return mapper.map(updated, RolePermission, RolePermissionResponseDto);
  }

  public async deleteRolePermission(slug: string): Promise<number> {
    const rolePermission = await rolePermissionRepository.findOneBy({
      slug,
    });
    if (!rolePermission)
      throw new GlobalError(ErrorCodes.ROLE_PERMISSION_NOT_FOUND);

    const deleted = await rolePermissionRepository.softDelete({ slug });
    return deleted.affected || 0;
  }

  public async getAllRolePermissions(): Promise<RolePermissionResponseDto[]> {
    const rolePermissions = await rolePermissionRepository.find({
      relations: ["role", "permission.authority", "permission.resource"],
    });

    return mapper.mapArray(
      rolePermissions,
      RolePermission,
      RolePermissionResponseDto
    );
  }
}

export default new RolePermissionService();
