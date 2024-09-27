import { UserApprovalFormResponseDto } from "@dto/response";
import { UserApproval } from "@entities";
import { mapper } from "@mappers";
import { userApprovalRepository } from "@repositories";
import { TPaginationOptionResponse, TQueryRequest } from "@types";

class UserApprovalService {
  public async getUserApprovals(
    userId: string,
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<UserApprovalFormResponseDto[]>> {
    // Parse and validate pagination parameters
    let pageSize =
      typeof options.pageSize === "string"
        ? parseInt(options.pageSize, 10)
        : options.pageSize;
    let page =
      typeof options.page === "string"
        ? parseInt(options.page, 10)
        : options.page;

    const totalApprovalForms = await userApprovalRepository.count({
      where: {
        assignedUserApproval: {
          user: {
            id: userId
          }
        },
      },
    });

    // Ensure page and pageSize are positive numbers
    if (isNaN(page) || page <= 0) page = 1;
    if (isNaN(pageSize) || pageSize <= 0) pageSize = 10; // Default pageSize if invali

    // Calculate pagination details
    const totalPages = Math.ceil(totalApprovalForms / pageSize);

    const approvalForms = await userApprovalRepository.find({
      where: {
        assignedUserApproval: {
          user: {
            id: userId
          }
        },
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { createdAt: options.order },
      relations: [
        "productRequisitionForm",
        "productRequisitionForm.company",
        "productRequisitionForm.site",
        "productRequisitionForm.project",
        "productRequisitionForm.creator",
        "productRequisitionForm.requestProducts",
        "productRequisitionForm.requestProducts.product",
        "productRequisitionForm.userApprovals",
        "productRequisitionForm.userApprovals.user",
        "productRequisitionForm.userApprovals.approvalLogs",
      ],
    });

    const approvalFormsDto: UserApprovalFormResponseDto[] = mapper.mapArray(
      approvalForms,
      UserApproval,
      UserApprovalFormResponseDto
    );

    return {
      items: approvalFormsDto,
      page,
      pageSize,
      totalPages,
    };
  }
}

export default new UserApprovalService();
