import { IProductRequirementInfoCreate, IProductRequisitionInfo } from './product.type'

export interface IRequisitionStore {
  requisition: IProductRequirementInfoCreate | undefined
  getRequisition: () => IProductRequirementInfoCreate | undefined
  setRequisition: (requisition: IProductRequirementInfoCreate) => void
  updateRequisition: (updatedFields: Partial<IProductRequirementInfoCreate>) => void
  clearRequisition: () => void
  addProductToRequisition: (product: IProductRequisitionInfo) => void
  updateProductToRequisition: (product: IProductRequisitionInfo, requestQuantity: number) => void
  deleteProductToRequisition: (product: IProductRequisitionInfo) => void
}

export interface IUserApproval {
  userSlug: string
  roleApproval: string
}
