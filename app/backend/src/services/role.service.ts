import { mapper } from "@mappers";
import { Role } from "@entities";
import { roleRepository, userRepository } from "@repositories";
import { RoleResponseDto } from "@dto/response";
import { TCreateRoleRequestDto } from "@types";
import { plainToClass } from "class-transformer";
import { CreateRoleRequestDto } from "@dto/request";
import { validate } from "class-validator";
import { ValidationError } from "@exception";
import { logger } from "@lib/logger";

class RoleService {
  public async getAllRoles(): Promise<RoleResponseDto[]> {
    const roles = await roleRepository.find();
    const results = mapper.mapArray(roles, Role, RoleResponseDto);
    return results;
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
