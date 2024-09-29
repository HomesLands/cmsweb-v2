import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { userRepository, assignedUserApprovalRepository } from "@repositories";
import { mapper } from "@mappers";
import { AssignedUserApproval } from "@entities";
import { AssignedUserApprovalResponseDto } from "@dto/response";
import { CreateAssignedUserApprovalRequestDto } from "@dto/request";
import { TCreateAssignedUserApprovalRequestDto } from "@types";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";


class AssignedUserApprovalService {
  public async getAllAssignedUserApprovals(): Promise<AssignedUserApprovalResponseDto[] | []> {
    const assignedUserApprovalData = await assignedUserApprovalRepository.find({
      relations: [
        'user',
        'userApprovals'
      ]
    });

    const assignedUserApprovalsDto: AssignedUserApprovalResponseDto[] = mapper.mapArray(
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
    const requestData = plainToClass(CreateAssignedUserApprovalRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const user = await userRepository.findOneBy({ slug: requestData.user });
    if(!user) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);

    const assignedUserApprovalData = mapper.map(
      requestData, 
      CreateAssignedUserApprovalRequestDto, 
      AssignedUserApproval
    );
    assignedUserApprovalData.user = user;

    const dataAssignedUserApprovalCreated = await assignedUserApprovalRepository.createAndSave(assignedUserApprovalData);
    
    return mapper.map(dataAssignedUserApprovalCreated, AssignedUserApproval, AssignedUserApprovalResponseDto);
  }
}

export default new AssignedUserApprovalService();