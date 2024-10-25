import { projectRepository, siteRepository } from "@repositories";
import { mapper } from "@mappers";
import { Project } from "@entities";
import { ProjectResponseDto } from "@dto/response";
import { CreateProjectRequestDto, UpdateProjectRequestDto } from "@dto/request";
import { TCreateProjectRequestDto, TUpdateProjectRequestDto } from "@types";
import { plainToClass } from "class-transformer";
import { ErrorCodes, ValidationError, GlobalError } from "@exception";
import { validate } from "class-validator";

class ProjectService {
  public async getAllProjects(): Promise<ProjectResponseDto[]> {
    const projectsData = await projectRepository.find({
      relations: ["productRequisitionForms", "site"],
    });

    const projectsDto: ProjectResponseDto[] = mapper.mapArray(
      projectsData,
      Project,
      ProjectResponseDto
    );
    return projectsDto;
  }

  public async getProjectBySite( siteSlug: string ): Promise<ProjectResponseDto[]>{
    const projectsData = await projectRepository.find({
      where: {
        site: {
          slug: siteSlug
        }
      },
    });
    const projectsDto: ProjectResponseDto[] = mapper.mapArray(
      projectsData,
      Project,
      ProjectResponseDto
    );
    return projectsDto;
  }

  public async createProject(
    plainData: TCreateProjectRequestDto
  ): Promise<ProjectResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(CreateProjectRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const site = await siteRepository.findOneBy({ slug: requestData.site });
    if (!site) {
      throw new GlobalError(ErrorCodes.SITE_NOT_FOUND);
    }

    const projectData = mapper.map(
      requestData,
      CreateProjectRequestDto,
      Project
    );
    projectData.site = site;

    const projectDataCreated =
      await projectRepository.createAndSave(projectData);

    return mapper.map(projectDataCreated, Project, ProjectResponseDto);
  }

  public async updateProject(
    slug: string,
    plainData: TUpdateProjectRequestDto
  ): Promise<ProjectResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(UpdateProjectRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const project = await projectRepository.findOneBy({ slug });
    if(!project) throw new GlobalError(ErrorCodes.PROJECT_NOT_FOUND);

    const site = await siteRepository.findOneBy({ slug: requestData.site });
    if (!site) {
      throw new GlobalError(ErrorCodes.SITE_NOT_FOUND);
    }

    Object.assign(project, requestData, { site });

    const projectDataUpdated =
      await projectRepository.save(project);

    return mapper.map(projectDataUpdated, Project, ProjectResponseDto);
  }
}

export default new ProjectService();
