import { IProductRequisitionFormCreate, IProductRequisitionInfo } from './product-requisition.type'

export interface IRequisitionStore {
  requisition: IProductRequisitionFormCreate | undefined
  getRequisition: () => IProductRequisitionFormCreate | undefined
  setRequisition: (requisition: IProductRequisitionFormCreate) => void
  updateRequisition: (updatedFields: Partial<IProductRequisitionFormCreate>) => void
  clearRequisition: () => void
  addProductToRequisition: (product: IProductRequisitionInfo) => void
  updateProductToRequisition: (product: IProductRequisitionInfo, requestQuantity: number) => void
  deleteProductToRequisition: (product: IProductRequisitionInfo) => void
}

export interface IUserApproval {
  userSlug: string
  roleApproval: string
}
