import { mapper } from "@mappers";
import { Authority } from "@entities";
import { authorityRepository } from "@repositories";
import { AuthorityResponseDto } from "@dto/response";
import {
  TCreateAuthorityRequestDto,
  TPaginationOptionResponse,
  TQueryRequest,
} from "@types";
import { plainToClass } from "class-transformer";
import {
  CreateAuthorityRequestDto,
  UpdateAuthorityRequestDto,
} from "@dto/request";
import { validate } from "class-validator";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { Ability, MongoQuery } from "@casl/ability";
import { Action } from "@enums";
import { Subjects } from "@lib/casl";

class AuthorityService {
  public async getAllAuthorities(
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<AuthorityResponseDto[]>> {
    // Get the total number of authorities
    const totalAuthorities = await authorityRepository.count();

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
    const totalPages = Math.ceil(totalAuthorities / pageSize);

    const authorities = await authorityRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { createdAt: options.order },
    });

    const results = mapper.mapArray(
      authorities,
      Authority,
      AuthorityResponseDto
    );
    return {
      items: results,
      page,
      pageSize,
      totalPages,
    };
  }

  public async getAuthorityBySlug(slug: string): Promise<AuthorityResponseDto> {
    const authority = await authorityRepository.findOneBy({
      slug,
    });
    if (!authority) throw new GlobalError(ErrorCodes.AUTHORITY_NOT_FOUND);
    const results = mapper.map(authority, Authority, AuthorityResponseDto);
    return results;
  }

  public async createAuthority(
    plainData: TCreateAuthorityRequestDto
  ): Promise<AuthorityResponseDto> {
    const requestData = plainToClass(CreateAuthorityRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const authority = mapper.map(
      requestData,
      CreateAuthorityRequestDto,
      Authority
    );

    const createdAuthority = await authorityRepository.createAndSave(authority);

    return mapper.map(createdAuthority, Authority, AuthorityResponseDto);
  }

  public async updateAuthority(
    slug: string,
    plainData: UpdateAuthorityRequestDto,
    ability?: Ability<[Action, Subjects], MongoQuery>
  ): Promise<AuthorityResponseDto> {
    // if (!ability) throw new GlobalError(StatusCodes.FORBIDDEN);

    const requestData = plainToClass(UpdateAuthorityRequestDto, plainData);
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const authority = await authorityRepository.findOneBy({ slug });
    if (!authority) throw new GlobalError(ErrorCodes.AUTHORITY_NOT_FOUND);

    // if (!ability.can(Action.UPDATE, authority))
    //   throw new GlobalError(StatusCodes.FORBIDDEN);

    Object.assign(authority, requestData);
    const updatedAuthority = await authorityRepository.save(authority);
    const authorityDto = mapper.map(
      updatedAuthority,
      Authority,
      AuthorityResponseDto
    );
    return authorityDto;
  }

  public async deleteAuthority(slug: string): Promise<number> {
    const authority = await authorityRepository.findOneBy({
      slug,
    });
    if (!authority) throw new GlobalError(ErrorCodes.AUTHORITY_NOT_FOUND);

    const deleted = await authorityRepository.softDelete({ slug });
    return deleted.affected || 0;
  }
}

export default new AuthorityService();
