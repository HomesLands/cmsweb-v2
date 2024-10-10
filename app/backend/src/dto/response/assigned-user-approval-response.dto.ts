import { AutoMap } from "@automapper/classes";
import { 
  UserApprovalResponseDto, 
  UserResponseDto,
} from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";
import { Site } from "@entities/site.entity";

export class AssignedUserApprovalResponseDto extends BaseResponseDto {
  @AutoMap()
  formType?: string;

  @AutoMap()
  roleApproval?: string;

  @AutoMap(() => [UserApprovalResponseDto])
  userApprovals?: UserApprovalResponseDto[];

  @AutoMap(() => UserResponseDto)
  user?: UserResponseDto;

  @AutoMap(() => Site)
  site?: Site;
}