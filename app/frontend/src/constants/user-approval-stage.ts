export enum UserApprovalStage {
  APPROVAL_STAGE_1 = 'approval_stage_1',
  APPROVAL_STAGE_2 = 'approval_stage_2',
  APPROVAL_STAGE_3 = 'approval_stage_3'
}

export enum ApprovalAction {
  ACCEPT = 'accept',
  GIVE_BACK = 'give_back',
  CANCEL = 'cancel'
}

export enum ApprovalLogStatus {
  ACCEPT = 'accept',
  REJECT = 'reject',
  GIVE_BACK = 'give_back',
  WAITING = 'waiting'
}
