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
import path from "path";
import fs from "fs/promises";

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

  public async loadResources(): Promise<ResourceResponseDto[]> {
    const resources = await resourceRepository.find({});
    const folderPath = path.join(__dirname, "../entities");
    const excludedFiles = ["base", "index"];

    // Check if the folder exists
    const folderExists = await fs.stat(folderPath);
    if (!folderExists.isDirectory()) {
      console.error(`Path ${folderPath} is not a directory.`);
      throw new GlobalError(ErrorCodes.FOLDER_NOT_FOUND);
    }

    // Read the folder contents asynchronously
    const files = await fs.readdir(folderPath);

    const filteredFiles = (
      await Promise.all(
        files.map(async (item) => {
          // Check if it's a file (ignores directories)
          const itemPath = path.join(folderPath, item);
          const stats = await fs.stat(itemPath);

          if (!stats.isFile()) return null; // Return null for directories
          if (excludedFiles.includes(item.split(".")[0])) return null; // Return null if the file is excluded

          const isExistedResource = resources.some(
            (resource) => resource.name === item.split(".")[0]
          );

          if (isExistedResource) return null; // Return null if the resource exists

          return item; // Return the file name if it passes all checks
        })
      )
    )
      .filter((item) => item !== null)
      .map((item) => item.split(".")[0]);

    const resourcesRequest: CreateResourceRequestDto[] = [
      ...new Set(filteredFiles),
    ].map((item) => {
      const resource: CreateResourceRequestDto = { name: item };
      return resource;
    });

    const newResources = mapper.mapArray(
      resourcesRequest,
      CreateResourceRequestDto,
      Resource
    );

    const createdResources =
      await resourceRepository.bulkCreateAndSave(newResources);
    return mapper.mapArray(createdResources, Resource, ResourceResponseDto);
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

    const updatedResource = await resourceRepository.save(resource);
    return mapper.map(updatedResource, Resource, ResourceResponseDto);
  }
}

export default new ResourceService();
