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

    // let roleApproval = RoleApproval.APPROVAL_STAGE_1;

    // const site = await siteRepository.findOneBy({
    //   manager: { id: userId },
    // });
    // const company = await companyRepository.findOneBy({
    //   director: {
    //     id: userId,
    //   },
    // });

    // if (site) {
    //   roleApproval = RoleApproval.APPROVAL_STAGE_2;
    // } else if (company) {
    //   roleApproval = RoleApproval.APPROVAL_STAGE_3;
    // }

    const totalApprovalForms = await userApprovalRepository.count({
      where: {
        assignedUserApproval: {
          user: {
            id: userId,
          },
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
            id: userId,
          },
        },
        // roleApproval: roleApproval,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: {
        productRequisitionForm: { type: "DESC" },
        createdAt: options.order,
      },
      relations: [
        "assignedUserApproval",
        // "productRequisitionForm",
        "productRequisitionForm.project",
        "productRequisitionForm.creator",
        "productRequisitionForm.creator.userDepartments.department.site.company",
        // "productRequisitionForm.requestProducts",
        "productRequisitionForm.requestProducts.product.unit",
        "productRequisitionForm.requestProducts.temporaryProduct.unit",
        // "productRequisitionForm.userApprovals",
        // "productRequisitionForm.userApprovals.assignedUserApproval",
        "productRequisitionForm.userApprovals.assignedUserApproval.user",
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
