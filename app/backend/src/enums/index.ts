export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum ProductPurchaseFormStatus {
  WAITING = "waiting", // storekeeper create
  PURCHASING = "purchasing", // shopper confirm purchase with this form
  IMPORTING = "importing",
  DONE = "done",  // completed import
}

export enum ProductRequisitionFormStatus {
  CANCEL = "cancel", // creator can edit
  WAITING = "waiting", // waiting stage 1 approval -> creator can edit
  ACCEPTED_STAGE_1 = "accepted_stage_1", // waiting stage 2 approval
  ACCEPTED_STAGE_2 = "accepted_stage_2", // waiting stage 3 approval
  WAITING_EXPORT = "waiting_export",
  EXPORTING = "exporting",
  DONE = "done",
}

export enum FormApprovalType {
  PRODUCT_REQUISITION_FORM = "product-requisition-form",
  PRODUCT_EXPORT_FORM = "product-export-form",
  PRODUCT_IMPORT_FORM = "product-import-form",
  PURCHASE_REQUISITION_FORM = "purchase-requisition-form",
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

export enum Action {
  MANAGE = "manage",
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
  VIEW = "view",
}

export enum Extension {
  EXCEL = "xlsx",
  PDF = "pdf",
  WORD = "docx",
}

export enum NotificationType {
  APPROVAL = "approval",
  WARNING = "warning",
  INFO = "info",
  REMINDER = "reminder",
}

export enum Topic {
  PRODUCT_REQUISITION_FORM = "product-requsition-form",
}
