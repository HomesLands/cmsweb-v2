import { AutoMap } from "@automapper/classes";
import { 
  UserApprovalResponseDto, 
  UserResponseDto,
} from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";

export class AssignedUserApprovalResponseDto extends BaseResponseDto {
  @AutoMap()
  formType?: string;

  @AutoMap()
  roleApproval?: string;

  @AutoMap(() => [UserApprovalResponseDto])
  userApprovals?: UserApprovalResponseDto[];

  @AutoMap(() => UserResponseDto)
  user?: UserResponseDto;
}