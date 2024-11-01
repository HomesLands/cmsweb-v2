import { mapper } from "@mappers";
import { Role } from "@entities";
import { roleRepository } from "@repositories";
import { RoleResponseDto } from "@dto/response";
import {
  TCreateRoleRequestDto,
  TPaginationOptionResponse,
  TQueryRequest,
} from "@types";
import { plainToClass } from "class-transformer";
import { CreateRoleRequestDto, UpdateRoleRequestDto } from "@dto/request";
import { validate } from "class-validator";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { parsePagination } from "@utils/pagination.util";

class RoleService {
  public async getAllRoles(
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<RoleResponseDto[]>> {
    // Get the total number of roles
    const totalRoles = await roleRepository.count();

    // Parse and validate pagination parameters
    const { page, pageSize } = parsePagination(options);

    // Calculate pagination details
    const totalPages = Math.ceil(totalRoles / pageSize);

    const roles = await roleRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { createdAt: options.order },
      relations: [
        "rolePermissions.permission.authority",
        "rolePermissions.permission.resource",
      ],
    });

    const results = mapper.mapArray(roles, Role, RoleResponseDto);
    return {
      items: results,
      page,
      pageSize,
      totalPages,
    };
  }

  public async getRoleBySlug(slug: string): Promise<RoleResponseDto> {
    const role = await roleRepository.findOneBy({
      slug,
    });
    const results = mapper.map(role, Role, RoleResponseDto);
    return results;
  }

  public async createRole(
    plainData: TCreateRoleRequestDto
  ): Promise<RoleResponseDto> {
    const requestData = plainToClass(CreateRoleRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const role = mapper.map(requestData, CreateRoleRequestDto, Role);

    const createdRole = await roleRepository.createAndSave(role);

    return mapper.map(createdRole, Role, RoleResponseDto);
  }

  public async updateRole(
    slug: string,
    plainData: UpdateRoleRequestDto
  ): Promise<RoleResponseDto> {
    const requestData = plainToClass(UpdateRoleRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const role = await roleRepository.findOneBy({ slug });
    if (!role) throw new GlobalError(ErrorCodes.ROLE_NOT_FOUND);

    Object.assign(role, requestData);
    const updatedRole = await roleRepository.save(role);

    const roleDto = mapper.map(updatedRole, Role, RoleResponseDto);
    return roleDto;
  }

  public async deleteRole(slug: string): Promise<number> {
    const role = await roleRepository.findOneBy({
      slug,
    });
    if (!role) throw new GlobalError(ErrorCodes.ROLE_NOT_FOUND);

    const deleted = await roleRepository.softDelete({ slug });
    return deleted.affected || 0;
  }
}

export default new RoleService();
