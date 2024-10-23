import { mapper } from "@mappers";
import {
  authorityRepository,
  permissionRepository,
  resourceRepository,
} from "@repositories";
import { PermissionResponseDto } from "@dto/response";
import {
  TCreatePermissionRequestDto,
  TPaginationOptionResponse,
  TQueryRequest,
  TUpdatePermissionRequestDto,
} from "@types";
import { plainToClass } from "class-transformer";
import {
  CreatePermissionRequestDto,
  UpdatePermissionRequestDto,
} from "@dto/request";
import { validate } from "class-validator";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { Permission } from "@entities";
import { parsePagination } from "@utils/pagination.util";

class PermissionService {
  public async getAllPermissions(
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<PermissionResponseDto[]>> {
    // Get the total number of authorities
    const totalPermissions = await permissionRepository.count();

    // Parse and validate pagination parameters
    const { page, pageSize } = parsePagination(options);

    // Calculate pagination details
    const totalPages = Math.ceil(totalPermissions / pageSize);

    const permissions = await permissionRepository.find({
      order: { createdAt: "DESC" },
      take: pageSize,
      skip: (page - 1) * pageSize,
      relations: ["authority", "resource"],
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
      relations: ["authority", "resource"],
      where: { slug },
    });
    if (!permission) throw new GlobalError(ErrorCodes.PERMISSION_NOT_FOUND);

    const results = mapper.map(permission, Permission, PermissionResponseDto);
    return results;
  }

  public async createPermission(
    plainData: TCreatePermissionRequestDto
  ): Promise<PermissionResponseDto> {
    const requestData = plainToClass(CreatePermissionRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const resource = await resourceRepository.findOneBy({
      slug: requestData.resourceSlug,
    });
    const authority = await authorityRepository.findOneBy({
      slug: requestData.authoritySlug,
    });

    if (!resource) throw new GlobalError(ErrorCodes.RESOURCE_NOT_FOUND);
    if (!authority) throw new GlobalError(ErrorCodes.AUTHORITY_NOT_FOUND);

    // Check existed
    const isExisted = await permissionRepository.existsBy({
      authority: { id: authority.id },
      resource: { id: resource.id },
    });
    if (isExisted) throw new GlobalError(ErrorCodes.PERMISSION_EXIST);

    const permission = mapper.map(
      requestData,
      CreatePermissionRequestDto,
      Permission
    );
    Object.assign(permission, { resource, authority });

    const createdPermission =
      await permissionRepository.createAndSave(permission);

    return mapper.map(createdPermission, Permission, PermissionResponseDto);
  }

  public async updatePermission(
    plainData: TUpdatePermissionRequestDto
  ): Promise<PermissionResponseDto> {
    const requestData = plainToClass(UpdatePermissionRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const permission = await permissionRepository.findOne({
      where: { slug: requestData.slug },
    });
    if (!permission) throw new GlobalError(ErrorCodes.PERMISSION_NOT_FOUND);

    const resource = await resourceRepository.findOneBy({
      slug: requestData.resourceSlug,
    });
    const authority = await authorityRepository.findOneBy({
      slug: requestData.authoritySlug,
    });

    if (!resource) throw new GlobalError(ErrorCodes.RESOURCE_NOT_FOUND);
    if (!authority) throw new GlobalError(ErrorCodes.AUTHORITY_NOT_FOUND);

    Object.assign(permission, { ...requestData, resource, authority });

    const updated = await permissionRepository.save(permission);

    return mapper.map(updated, Permission, PermissionResponseDto);
  }

  public async deletePermission(slug: string): Promise<number> {
    const permission = await permissionRepository.findOneBy({
      slug,
    });
    if (!permission) throw new GlobalError(ErrorCodes.PERMISSION_NOT_FOUND);

    const deleted = await permissionRepository.softDelete({ slug });
    return deleted.affected || 0;
  }
}

export default new PermissionService();
