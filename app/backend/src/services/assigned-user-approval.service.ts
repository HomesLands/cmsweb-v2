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
  GetAssignedUserApprovalRequestDto,
} from "@dto/request";
import {
  TCreateAssignedUserApprovalRequestDto,
  TGetAssignedUserApprovalRequestDto,
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

    const dataCheck = await assignedUserApprovalRepository.findOne({
      where: {
        formType: requestData.formType,
        roleApproval: requestData.roleApproval,
        site: {
          slug: requestData.site,
        },
      },
    });
    // check unique
    if (dataCheck)
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
}

export default new AssignedUserApprovalService();
