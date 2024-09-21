import { IProductRequirementInfoCreate, IRequestProduct } from './product.type'

export interface IRequisitionStore {
  requisition: IProductRequirementInfoCreate | undefined
  setRequisition: (requisition: IProductRequirementInfoCreate) => void
  clearRequisition: () => void
  addProductToRequisition: (product: IRequestProduct) => void
  updateProductToRequisition: (product: IRequestProduct) => void
  deleteProductToRequisition: (product: IRequestProduct) => void
}
