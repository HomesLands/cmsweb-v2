import { mapper } from "@mappers";
import {
  authorityRepository,
  permissionRepository,
  roleRepository,
} from "@repositories";
import { PermissionResponseDto } from "@dto/response";
import {
  TCreatePermissionRequestDto,
  TPaginationOptionResponse,
  TQueryRequest,
} from "@types";
import { plainToClass } from "class-transformer";
import { CreatePermissionRequestDto } from "@dto/request";
import { validate } from "class-validator";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { logger } from "@lib";
import { Permission } from "@entities";

class PermissionService {
  public async getAllPermissions(
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<PermissionResponseDto[]>> {
    // Get the total number of authorities
    const totalPermissions = await permissionRepository.count();

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
    // Calculate pagination details
    const totalPages = Math.ceil(totalPermissions / pageSize);

    const permissions = await permissionRepository.find({
      order: { role: { nameNormalize: "DESC" }, createdAt: "DESC" },
      take: pageSize,
      skip: (page - 1) * pageSize,
      relations: ["role", "authority", "resource"],
    });

    const results = mapper.mapArray(
      permissions,
      Permission,
      PermissionResponseDto
    );
    return {
      items: results,
      page,
      pageSize,
      totalPages,
    };
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
