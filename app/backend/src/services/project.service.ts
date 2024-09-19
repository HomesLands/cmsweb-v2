import { projectRepository, userRepository } from "@repositories";
import { mapper } from "@mappers";
import { Project } from "@entities";
import { ProjectResponseDto } from "@dto/response";
import { CreateProjectRequestDto } from "@dto/request";
import { TCreateProjectRequestDto } from "@types";
import { plainToClass } from "class-transformer";
import { ErrorCodes, ValidationError, GlobalError } from "@exception";
import { validate } from "class-validator";

class ProjectService {
  public async getAllSites(): Promise<ProjectResponseDto[] | []> {
    const projectsData = await projectRepository.findAllSite();
    if(projectsData.length < 1) {
      return [];
    }
    const projectsDto: ProjectResponseDto[] = mapper.mapArray(
      projectsData,
      Project,
      ProjectResponseDto
    );
    return projectsDto;
  }

  public async createProject(plainData: TCreateProjectRequestDto): Promise<ProjectResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(CreateProjectRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const manager = await userRepository.findOneBy({ slug: requestData.manager });
    if (!manager) {
      throw new GlobalError(ErrorCodes.USER_ASSIGNED_NOT_FOUND);
    }

    const projectData = mapper.map(requestData, CreateProjectRequestDto, Project);    
    projectData.manager = manager;

    const projectDataCreated = await projectRepository.createAndSave(projectData);

    return mapper.map(projectDataCreated, Project, ProjectResponseDto);
  }
}

export default new ProjectService();