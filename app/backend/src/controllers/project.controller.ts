import { TApiResponse } from "@types";
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
   *         - process
   *         - description
   *         - fileDescription
   *         - manager
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
   *         manager:
   *           type: string
   *           description: managerId
   *       example:
   *         name: FirstSite
   *         startDate: 2024-09-15T10:25:45+07:00
   *         process: 1
   *         description: project description
   *         fileDescription: temp file description
   *         manager: 3c3d5058-6fd0-445c-a123-f14108c7ec5c
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
      const projectsData = await projectService.getAllSites();

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
   * /projects/create:
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
   *       200:
   *         description: New project created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *
   */
  public async createProject(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateProjectRequestDto;
      const projectData = await projectService.createProject(requestData);

      const response: TApiResponse<ProjectResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Create project successfully",
        method: req.method,
        path: req.originalUrl,
        result: projectData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProjectController();