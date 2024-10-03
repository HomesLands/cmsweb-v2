export enum RequisitionStatus {
  WAITING = 'waiting',
  ACCEPTED_STAGE_1 = 'accepted_stage_1',
  ACCEPTED_STAGE_2 = 'accepted_stage_2',
  ACCEPTED_STAGE_3 = 'accepted_stage_3',
  CANCEL = 'cancel',
  RECALLED = 'recalled',
  WAITING_EXPORT = 'waiting_export'
}

export enum RequisitionType {
  NORMAL = 'normal',
  URGENT = 'urgent'
}

export enum FilterRequisitionStatus {
  WAITING_APPROVAL_1 = 'waiting_approval_1',
  APPROVED_STAGE_1 = 'approved_stage_1',
  CANCELED_STAGE_1 = 'canceled_stage_1',
  WAITING_APPROVAL_2 = 'waiting_approval_2',
  RETURNED_STAGE_2 = 'returned_stage_2',
  APPROVED_STAGE_2 = 'approved_stage_2',
  CANCELED_STAGE_2 = 'canceled_stage_2',
  WAITING_APPROVAL_3 = 'waiting_approval_3',
  APPROVED_STAGE_3 = 'approved_stage_3',
  RETURNED_STAGE_3 = 'returned_stage_3',
  CANCELED_STAGE_3 = 'canceled_stage_3'
}
