import { AutoMap } from "@automapper/classes";
import { 
  UserApprovalResponseDto, 
  UserResponseDto,
  BaseResponseDto, 
} from "@dto/response";

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