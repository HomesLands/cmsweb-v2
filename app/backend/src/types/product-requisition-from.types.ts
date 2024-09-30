export type TCreateProductRequisitionFormRequestDto = {
  code?: string;
  project?: string;
  type?: string; //normal, urgent
  deadlineApproval?: string;
  description?: string;
  requestProducts: {
    product?: string;
    requestQuantity?: number;
  }[];
}

export type TApprovalProductRequisitionFormRequestDto = {
  formSlug?: string;
  // approvalUserSlug?: string;
  approvalLogStatus?: string;
  approvalLogContent?: string;
};

export type TResubmitProductRequisitionFormRequestDto = {
  slug?: string;
  description?: string;
};
