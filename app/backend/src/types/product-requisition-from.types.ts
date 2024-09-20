export type TCreateProductRequisitionFormRequestDto = {
  code?: string;
  companySlug?: string;
  type?: string; //normal, urgent
  requestProducts: {
    productSlug?: string;
    requestQuantity?: number;
  }[];
  userApprovals: {
    userSlug?: string,
    roleApproval?: string // approval_stage_1, approval_stage_2, approval_stage_3
  }[];
}