import toast from 'react-hot-toast'
import i18next from 'i18next'

const errorCodes: { [key: number]: string } = {
  1000: 'toast.productAlreadyExists',
  1001: 'toast.invalidEmail',
  1002: 'toast.pathNotFound',
  1003: 'toast.invalidUsername',
  1004: 'toast.userNotFound',
  1005: 'toast.unableToSaveLoginSession',
  1006: 'toast.userAlreadyExists',
  1007: 'toast.undefinedError',
  1008: 'toast.invalidPassword',
  // 1009: 'toast.invalidFirstName',
  // 1010: 'toast.invalidLastName',
  1011: 'toast.invalidFullName',
  1012: 'toast.invalidToken',
  1013: 'toast.invalidJwtPayload',
  1014: 'toast.tokenNotExpired',
  1015: 'toast.subjectNotExist',
  1016: 'toast.invalidRefreshToken',
  1017: 'toast.sessionExpired',
  1018: 'toast.refreshTokenNotValid',
  1019: 'toast.tokenIatNotExist',
  1020: 'toast.tokenIdNotExist',
  1021: 'toast.tokenExpirationNotExist',
  1022: 'toast.userAssignedNotFound',
  1023: 'toast.unitExisted',
  1024: 'toast.unitNotFound',
  1025: 'toast.codeProductExisted',
  1026: 'toast.invalidProductProvider',
  1027: 'toast.invalidProductName',
  1028: 'toast.invalidProductUnit',
  1029: 'toast.invalidProductCode',
  1030: 'toast.invalidSiteName',
  1031: 'toast.invalidSiteAddress',
  1032: 'toast.invalidSiteManager',
  1033: 'toast.invalidProjectName',
  1034: 'toast.invalidProjectStartDate',
  1035: 'toast.invalidProjectProcess',
  1036: 'toast.invalidProjectDescription',
  1037: 'toast.invalidProjectFileDescription',
  1038: 'toast.invalidProjectManager',
  1039: 'toast.invalidUnitName', //Duplicate with Invalid date format
  1040: 'toast.invalidCompanyName',
  1041: 'toast.invalidCompanyNameExisted',
  1042: 'toast.invalidProductRequisitionFormCodeExisted',
  1043: 'toast.invalidCompanyNotFound',
  1044: 'toast.invalidQuantityUserApproval',

  1045: 'toast.invalidQuantityProductApproval',
  1046: 'toast.invalidProductRequisitionFormStatus',
  1047: 'toast.invalidProductRequisitionFormDate',
  1048: 'toast.invalidProductRequisitionFormDescription',
  1049: 'toast.invalidProductRequisitionFormFile',
  1050: 'toast.invalidProductRequisitionFormManager',

  403: 'toast.accessDenied',
  401: 'toast.loginFailed'
}

export function showToast(message: string) {
  toast.success(i18next.t(message, { ns: 'toast' }))
}

export function showErrorToast(code: number) {
  const messageKey = errorCodes[code] || 'toast.requestFailed'
  toast.error(i18next.t(messageKey, { ns: 'toast' }))
}

export function useErrorToast(code: number) {
  const messageKey = errorCodes[code] || 'toast.requestFailed'
  console.log(messageKey)
  toast.error(i18next.t(messageKey, { ns: 'toast' }))
}
