import { mapper } from "@mappers";
import { resourceRepository } from "@repositories";
import { ResourceResponseDto } from "@dto/response";
import {
  TCreateResourceRequestDto,
  TPaginationOptionResponse,
  TQueryRequest,
  TUpdateResourceRequestDto,
} from "@types";
import { plainToClass } from "class-transformer";
import {
  CreateResourceRequestDto,
  UpdateResourceRequestDto,
} from "@dto/request";
import { validate } from "class-validator";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { Resource } from "@entities";
import { parsePagination } from "@utils";

class ResourceService {
  public async getAllResources(
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<ResourceResponseDto[]>> {
    // Get the total number of authorities
    const totalResources = await resourceRepository.count();

    // Parse and validate pagination parameters
    const { page, pageSize } = parsePagination({ ...options });

    // Calculate pagination details
    const totalPages = Math.ceil(totalResources / pageSize);

    const resources = await resourceRepository.find({
      order: { createdAt: options.order },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    const results = mapper.mapArray(resources, Resource, ResourceResponseDto);
    return {
      items: results,
      page,
      pageSize,
      totalPages,
    };
  }

  public async getResourceBySlug(slug: string): Promise<ResourceResponseDto> {
    const resource = await resourceRepository.findOne({
      where: { slug },
    });
    if (!resource) throw new GlobalError(ErrorCodes.PERMISSION_NOT_FOUND);

    const results = mapper.map(resource, Resource, ResourceResponseDto);
    return results;
  }

  public async createResource(
    plainData: TCreateResourceRequestDto
  ): Promise<ResourceResponseDto> {
    const requestData = plainToClass(CreateResourceRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const resource = mapper.map(
      requestData,
      CreateResourceRequestDto,
      Resource
    );

    const createdResource = await resourceRepository.createAndSave(resource);

    return mapper.map(createdResource, Resource, ResourceResponseDto);
  }

  public async updateResource(
    slug: string,
    plainData: TUpdateResourceRequestDto
  ): Promise<ResourceResponseDto> {
    const requestData = plainToClass(UpdateResourceRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const resource = await resourceRepository.findOneBy({ slug });
    if (!resource) throw new GlobalError(ErrorCodes.RESOURCE_NOT_FOUND);

    Object.assign(resource, { name: requestData.name });

    const updatedResource = await resourceRepository.createAndSave(resource);
    return mapper.map(updatedResource, Resource, ResourceResponseDto);
  }
}

export default new ResourceService();
