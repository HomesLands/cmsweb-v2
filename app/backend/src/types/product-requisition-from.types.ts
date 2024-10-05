import { 
  TCreateRequestProductRequestDto,
  TCreateApprovalLogRequestDto, 
} from "@types";

export type TCreateProductRequisitionFormRequestDto = {
  code?: string;
  project?: string;
  type?: string; //normal, urgent
  deadlineApproval?: string;
  description?: string;
  // requestProducts: {
  //   product?: string;
  //   requestQuantity?: number;
  // }[];
  requestProducts: TCreateRequestProductRequestDto[];
}

export type TApprovalProductRequisitionFormRequestDto = {
  formSlug?: string;
  // approvalUserSlug?: string;
  // approvalLogStatus?: string;
  // approvalLogContent?: string;
  approvalLog?: TCreateApprovalLogRequestDto;
};

export type TResubmitProductRequisitionFormRequestDto = {
  slug?: string;
  description?: string;
};
