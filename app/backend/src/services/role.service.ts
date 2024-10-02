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
import { CreateRoleRequestDto } from "@dto/request";
import { validate } from "class-validator";
import { ValidationError } from "@exception";
import { logger } from "@lib/logger";

class RoleService {
  public async getAllRoles(
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<RoleResponseDto[]>> {
    // Get the total number of products
    const totalRoles = await roleRepository.count();

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
    const totalPages = Math.ceil(totalRoles / pageSize);

    const roles = await roleRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { createdAt: options.order },
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
    logger.info("", { filename: RoleService.name, requestData });

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const role = mapper.map(requestData, CreateRoleRequestDto, Role);

    const createdRole = await roleRepository.createAndSave(role);

    return mapper.map(createdRole, Role, RoleResponseDto);
  }
}

export default new RoleService();
