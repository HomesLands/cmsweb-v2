import { mapper } from "@mappers";
import {
  authorityRepository,
  permissionRepository,
  roleRepository,
} from "@repositories";
import { PermissionResponseDto } from "@dto/response";
import { TCreatePermissionRequestDto } from "@types";
import { plainToClass } from "class-transformer";
import { CreatePermissionRequestDto } from "@dto/request";
import { validate } from "class-validator";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { logger } from "@lib";
import { Permission } from "@entities";

class PermissionService {
  public async getAllPermissions(): Promise<PermissionResponseDto[]> {
    const permissions = await permissionRepository.find({
      order: { createdAt: "DESC" },
      relationLoadStrategy: "query",
      relations: ["role", "authority"],
    });

    const results = mapper.mapArray(
      permissions,
      Permission,
      PermissionResponseDto
    );
    return results;
  }

  public async getPermissionBySlug(
    slug: string
  ): Promise<PermissionResponseDto> {
    const permission = await permissionRepository.findOne({
      relations: ["authority", "role"],
      where: { slug },
    });
    logger.info("", { permission });
    if (!permission) throw new GlobalError(ErrorCodes.PERMISSION_NOT_FOUND);

    const results = mapper.map(permission, Permission, PermissionResponseDto);
    console.log({ results });
    return results;
  }

  public async createPermission(
    plainData: TCreatePermissionRequestDto
  ): Promise<PermissionResponseDto> {
    const requestData = plainToClass(CreatePermissionRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const role = await roleRepository.findOneBy({ slug: requestData.roleSlug });
    const authority = await authorityRepository.findOneBy({
      slug: requestData.authoritySlug,
    });

    if (!role) throw new GlobalError(ErrorCodes.ROLE_NOT_FOUND);
    if (!authority) throw new GlobalError(ErrorCodes.AUTHORITY_NOT_FOUND);

    // Check existed
    const isExisted = await permissionRepository.existsBy({
      role: { id: role.id },
      authority: { id: authority.id },
    });
    if (isExisted) throw new GlobalError(ErrorCodes.PERMISSION_EXIST);

    const permission = new Permission();
    permission.authority = authority;
    permission.role = role;

    const createdPermission =
      await permissionRepository.createAndSave(permission);

    return mapper.map(createdPermission, Permission, PermissionResponseDto);
  }
}

export default new PermissionService();
