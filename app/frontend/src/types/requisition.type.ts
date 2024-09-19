import { IProductInfo, IProductRequirementInfoCreate } from './product.type'

export interface IRequisitionStore {
  requisition: IProductRequirementInfoCreate | undefined
  getRequisition: () => IProductRequirementInfoCreate | undefined
  setRequisition: (requisition: IProductRequirementInfoCreate) => void
  clearRequisition: () => void
  addProductToRequisition: (product: IProductInfo) => void // Added method
}
