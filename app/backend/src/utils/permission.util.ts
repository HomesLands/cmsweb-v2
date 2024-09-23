import { ProductRequisitionFormStatus } from "@enums";

export class PermissionUtils {
  /**
   * Check permission edit product requisition form
   * @param {string} formStatus
   * @param {boolean} isRecalled
   * @returns {boolean} Result of checking permission
   */
  static isPermitEditProductRequisitionForm(
    formStatus?: string,
    isRecalled?: boolean
  ): boolean {
    if(formStatus === ProductRequisitionFormStatus.WAITING)
      if(isRecalled === false) return true;
    if(formStatus === ProductRequisitionFormStatus.CANCEL)
      return true;
    return false;
  } 
}