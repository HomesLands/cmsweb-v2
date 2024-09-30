import { projectRepository, siteRepository, userRepository } from "@repositories";
import { mapper } from "@mappers";
import { Project } from "@entities";
import { ProjectResponseDto } from "@dto/response";
import { CreateProjectRequestDto } from "@dto/request";
import { TCreateProjectRequestDto } from "@types";
import { plainToClass } from "class-transformer";
import { ErrorCodes, ValidationError, GlobalError } from "@exception";
import { validate } from "class-validator";

class ProjectService {
  public async getAllProjects(): Promise<ProjectResponseDto[]> {
    const projectsData = await projectRepository.find({
      relations: [
        'productRequisitionForms',
        'site'
      ]
    });

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

    const site = await siteRepository.findOneBy({ slug: requestData.site });
    if (!site) {
      throw new GlobalError(ErrorCodes.SITE_NOT_FOUND);
    }

    const projectData = mapper.map(requestData, CreateProjectRequestDto, Project);    
    projectData.site = site;

    const projectDataCreated = await projectRepository.createAndSave(projectData);

    return mapper.map(projectDataCreated, Project, ProjectResponseDto);
  }
}

export default new ProjectService();