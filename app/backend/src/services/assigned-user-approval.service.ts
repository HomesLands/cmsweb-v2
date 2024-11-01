import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import {
  userRepository,
  assignedUserApprovalRepository,
  siteRepository,
} from "@repositories";
import { mapper } from "@mappers";
import { AssignedUserApproval } from "@entities";
import { AssignedUserApprovalResponseDto } from "@dto/response";
import {
  CreateAssignedUserApprovalRequestDto,
  UpdateAssignedUserApprovalRequestDto,
} from "@dto/request";
import {
  TCreateAssignedUserApprovalRequestDto,
  TGetAssignedUserApprovalRequestDto,
  TUpdateAssignedUserApprovalRequestDto,
} from "@types";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";

class AssignedUserApprovalService {
  public async getAssignedUserApprovals(
    plainData: TGetAssignedUserApprovalRequestDto
  ): Promise<AssignedUserApprovalResponseDto[] | []> {
    // const requestData = plainToClass(GetAssignedUserApprovalRequestDto, plainData);
    // const errors = await validate(requestData);
    // if(errors.length > 0) throw new ValidationError(errors);

    const assignedUserApprovalData = await assignedUserApprovalRepository.find({
      // where: {
      //   formType: requestData.formType,
      //   roleApproval: requestData.roleApproval,
      //   site: {
      //     slug: requestData.site,
      //   },
      //   user: {
      //     slug: requestData.user,
      //   },
      // },
      relations: ["user", "userApprovals", "site.company"],
    });

    const assignedUserApprovalsDto: AssignedUserApprovalResponseDto[] =
      mapper.mapArray(
        assignedUserApprovalData,
        AssignedUserApproval,
        AssignedUserApprovalResponseDto
      );
    return assignedUserApprovalsDto;
  }

  public async createAssignedUserApproval(
    plainData: TCreateAssignedUserApprovalRequestDto
  ): Promise<AssignedUserApprovalResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(
      CreateAssignedUserApprovalRequestDto,
      plainData
    );

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const user = await userRepository.findOneBy({ slug: requestData.user });
    if (!user) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);

    const site = await siteRepository.findOneBy({ slug: requestData.site });
    if (!site) throw new GlobalError(ErrorCodes.SITE_NOT_FOUND);

    const isExisted = await assignedUserApprovalRepository.exists({
      where: {
        formType: requestData.formType,
        roleApproval: requestData.roleApproval,
        site: {
          slug: requestData.site,
        },
      },
    });
    // check unique
    if (isExisted)
      throw new GlobalError(
        ErrorCodes.ASSIGNED_USER_APPROVAL_THIS_LEVEL_FOR_SITE_IS_EXISTED
      );

    const assignedUserApprovalData = mapper.map(
      requestData,
      CreateAssignedUserApprovalRequestDto,
      AssignedUserApproval
    );
    Object.assign(assignedUserApprovalData, {
      user,
      site,
    });

    const dataAssignedUserApprovalCreated =
      await assignedUserApprovalRepository.createAndSave(
        assignedUserApprovalData
      );

    return mapper.map(
      dataAssignedUserApprovalCreated,
      AssignedUserApproval,
      AssignedUserApprovalResponseDto
    );
  }

  public async deleteAssignedUserApproval(slug: string): Promise<number> {
    const assignedUserApproval = await assignedUserApprovalRepository.findOneBy(
      {
        slug,
      }
    );
    if (!assignedUserApproval)
      throw new GlobalError(ErrorCodes.ASSIGNED_USER_APPROVAL_NOT_FOUND);

    const deleted = await assignedUserApprovalRepository.softDelete({ slug });
    return deleted.affected || 0;
  }

  public async updateAssignedUserApproval(
    plainData: TUpdateAssignedUserApprovalRequestDto
  ): Promise<AssignedUserApprovalResponseDto> {
    const requestData = plainToClass(
      UpdateAssignedUserApprovalRequestDto,
      plainData
    );

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const assignedUserApproval = await assignedUserApprovalRepository.findOneBy(
      {
        slug: requestData.slug,
      }
    );

    const site = siteRepository.findOne({
      where: { slug: requestData.site },
    });

    const approver = await userRepository.findOne({
      where: { slug: requestData.user },
    });

    if (!assignedUserApproval)
      throw new GlobalError(ErrorCodes.ASSIGNED_USER_APPROVAL_NOT_FOUND);
    if (!site) throw new GlobalError(ErrorCodes.SITE_NOT_FOUND);
    if (!approver) throw new GlobalError(ErrorCodes.USER_APPROVAL_NOT_FOUND);

    // Ensure that each site has only one user approval per level
    const isExisted = await assignedUserApprovalRepository.exists({
      where: {
        formType: requestData.formType,
        roleApproval: requestData.roleApproval,
        site: {
          slug: requestData.site,
        },
      },
    });
    if (isExisted)
      throw new GlobalError(
        ErrorCodes.ASSIGNED_USER_APPROVAL_THIS_LEVEL_FOR_SITE_IS_EXISTED
      );

    Object.assign(assignedUserApproval, {
      ...requestData,
      site,
      user: approver,
    });
    const updated =
      await assignedUserApprovalRepository.save(assignedUserApproval);

    return mapper.map(
      updated,
      AssignedUserApproval,
      AssignedUserApprovalResponseDto
    );
  }
}

export default new AssignedUserApprovalService();
