import { mapper } from "@mappers";
import { Authority } from "@entities";
import { authorityRepository } from "@repositories";
import { AuthorityResponseDto } from "@dto/response";
import { TCreateAuthorityRequestDto } from "@types";
import { plainToClass } from "class-transformer";
import { CreateAuthorityRequestDto } from "@dto/request";
import { validate } from "class-validator";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";

class AuthorityService {
  public async getAllAuthorities(): Promise<AuthorityResponseDto[]> {
    const authorities = await authorityRepository.find();
    const results = mapper.mapArray(
      authorities,
      Authority,
      AuthorityResponseDto
    );
    return results;
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
}

export default new AuthorityService();
