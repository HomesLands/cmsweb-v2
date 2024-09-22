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
  CANCEL = "cancel", // creator can 
  WAITING = "waiting", // waiting stage 1 approval -> creator can edit
  // RECALLED_BY_STAGE_2 = "recalled_by_stage_2", // waiting stage 1 approval -> creator can't edit
  ACCEPTED_STAGE_1 = "accepted_stage_1", // waiting stage 2 approval
  // RECALLED_BY_STAGE_3 = "recalled_by_stage_3", // waiting stage 2 approval
  ACCEPTED_STAGE_2 = "accepted_stage_2", // waiting stage 3 approval
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

