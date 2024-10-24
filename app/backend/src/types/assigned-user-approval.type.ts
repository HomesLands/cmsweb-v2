export type TCreateAssignedUserApprovalRequestDto = {
  formType?: string;
  roleApproval?: string;
  user?: string;
  site?: string;
};

export type TGetAssignedUserApprovalRequestDto = {
  formType?: string;
  roleApproval?: string;
  site?: string;
  user?: string;
};

export type TUpdateAssignedUserApprovalRequestDto =
  TCreateAssignedUserApprovalRequestDto & {
    slug?: string;
  };
