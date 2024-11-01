import { TApiResponse, TUpdateProjectRequestDto } from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { projectService } from "@services";
import { ProjectResponseDto } from "@dto/response";
import { TCreateProjectRequestDto } from "@types";

class ProjectController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateProjectRequestDto:
   *       type: object
   *       required:
   *         - name
   *         - startDate
   *         - description
   *         - fileDescription
   *         - site
   *       properties:
   *         name:
   *           type: string
   *           description: projectname
   *         startDate:
   *           type: string
   *           description: startDate
   *         process:
   *           type: number
   *           description: processNumber
   *         description:
   *           type: string
   *           description: descriptionProject
   *         fileDescription:
   *           type: string
   *           description: fileDescriptionProject
   *         site:
   *           type: string
   *           description: siteSlug
   *       example:
   *         name: FirstProject
   *         startDate: 2024-09-15 10:25:45
   *         description: project description
   *         fileDescription: temp file description
   *         site: 3Co-M1ZL4
   *
   *     UpdateProjectRequestDto:
   *       type: object
   *       required:
   *         - name
   *         - startDate
   *         - description
   *         - fileDescription
   *         - site
   *       properties:
   *         name:
   *           type: string
   *           description: projectname
   *         startDate:
   *           type: string
   *           description: startDate
   *         process:
   *           type: number
   *           description: processNumber
   *         description:
   *           type: string
   *           description: descriptionProject
   *         fileDescription:
   *           type: string
   *           description: fileDescriptionProject
   *         site:
   *           type: string
   *           description: siteSlug
   *       example:
   *         name: FirstProject
   *         startDate: 2024-09-15 10:25:45
   *         description: project description
   *         fileDescription: temp file description
   *         site: 3Co-M1ZL4
   */

  /**
   * @swagger
   * tags:
   *   - name: Project
   *     description: The project managing API
   */

  /**
   * @swagger
   * /projects:
   *   get:
   *     summary: Get all projects
   *     tags: [Project]
   *     responses:
   *       200:
   *         description: Get all projects successfully.
   *       500:
   *         description: Server error
   */

  public async getAllProjects(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const projectsData = await projectService.getAllProjects();

      const response: TApiResponse<ProjectResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list projects successfully",
        method: req.method,
        path: req.originalUrl,
        result: projectsData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /projects/{siteSlug}:
   *   get:
   *     summary: Get all projects by site
   *     tags: [Project]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: siteSlug
   *         in: path
   *         required: true
   *         type: string
   *         description: The slug of site
   *     responses:
   *       200:
   *         description: Get all projects by site successfully.
   *       500:
   *         description: Server error
   */  
  public async getProjectsBySite(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const siteSlug = req.params.siteSlug as string;
      const projectsData = await projectService.getProjectBySite(siteSlug);

      const response: TApiResponse<ProjectResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list projects by site successfully",
        method: req.method,
        path: req.originalUrl,
        result: projectsData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /projects:
   *   post:
   *     summary: Create new project
   *     tags: [Project]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateProjectRequestDto'
   *     responses:
   *       201:
   *         description: New project created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1033:
   *         description: Invalid project name
   *       1034:
   *         description: Invalid project start date
   *       1036:
   *         description: Invalid project description
   *       1037:
   *         description: Invalid project file description
   *       1051:
   *         description: Site not found
   *       1059:
   *         description: Invalid site slug
   *
   */
  public async createProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateProjectRequestDto;
      const projectData = await projectService.createProject(requestData);

      const response: TApiResponse<ProjectResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "Create project successfully",
        method: req.method,
        path: req.originalUrl,
        result: projectData,
      };
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /projects/{slug}:
   *   delete:
   *     summary: Delete project
   *     tags: [Project]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of project
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Project deleted successfully.
   *       500:
   *         description: Server error
   *
   */
  public async deleteProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const result = await projectService.deleteProject(slug);

      const response: TApiResponse<string> = {
        code: StatusCodes.OK,
        error: false,
        message: "Project has been deleted successfully",
        method: req.method,
        path: req.originalUrl,
        result: `${result} rows effected`,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /projects/{slug}:
   *   patch:
   *     summary: Update project
   *     tags: [Project]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of project
   *         example: slug-123
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateProjectRequestDto'
   *     responses:
   *       200:
   *         description: Project updated successfully.
   *       500:
   *         description: Server error
   *       1052:
   *         description: Project not found
   *       1033:
   *         description: Invalid project name
   *       1034:
   *         description: Invalid project start date
   *       1036:
   *         description: Invalid project description
   *       1037:
   *         description: Invalid project file description
   *       1051:
   *         description: Site not found
   *
   */
  public async updateProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const requestData = req.body as TUpdateProjectRequestDto;
      Object.assign(requestData, { slug });

      const result = await projectService.updateProject(requestData);

      const response: TApiResponse<ProjectResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Project has been updated successfully",
        method: req.method,
        path: req.originalUrl,
        result,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

  

export default new ProjectController();
