export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum ProductStatus {
  OUT_OF_STOCK = "out_of_stock",
  IN_STOCK = "in_stock",
  BUYING = "buying",
}

export enum ProductRequisitionFormStatus {
  WAITING = "waiting",
  ACCEPTED_STAGE_1 = "accepted_stage_1",
  ACCEPTED_STAGE_2 = "accept_stage_2",
  WAITING_EXPORT = "waiting_export",
  EXPORTING = "exporting",
  DONE = "done",
}

export enum FormApprovalType {
  PRODUCT_REQUISITION_FORM = "product_requisition_form",
  PRODUCT_EXPORT_FORM = "product_export_form",
  PURCHASE_REQUISITION_FORM = "purchase_requisition_form"
}

export enum ApprovalLogStatus {
  ACCEPT = "accept",
  GIVE_BACK = "give_back",
  CANCEL = "cancel",
}

export enum ProductRequisitionFormType {
  NORMAL = "normal",
  URGENT = "urgent",
}

export enum RoleApproval {
  APPROVAL_STAGE_1 = "approval_stage_1",
  APPROVAL_STAGE_2 = "approval_stage_2",
  APPROVAL_STAGE_3 = "approval_stage_3",
}

