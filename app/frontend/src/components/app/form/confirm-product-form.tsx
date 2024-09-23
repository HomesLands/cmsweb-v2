import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button, DataTableRequisition } from '@/components/ui'
import {
  IFinalProductRequisition,
  IProductRequirementInfoCreate,
  IProductRequisitionInfo
} from '@/types'
import { useColumnsConfirm } from '@/views/product-requisitions/DataTable/columnsConfirm'
import { useRequisitionStore } from '@/stores'

import { TbeLogo } from '@/assets/images'
import { MetekLogo } from '@/assets/images'
import { SongnamLogo } from '@/assets/images'

interface IConfirmProductFormProps {
  onConfirm: (data: IFinalProductRequisition) => void
  onBack: () => void
}

export const ConfirmProductForm: React.FC<IConfirmProductFormProps> = ({ onConfirm, onBack }) => {
  const { t } = useTranslation('productRequisition')

  const { requisition, getRequisition, updateProductToRequisition, deleteProductToRequisition } =
    useRequisitionStore()

  const handleEditRequest = (product: IProductRequisitionInfo) => {
    updateProductToRequisition(product, product.requestQuantity)
  }

  const handleDeleteProduct = (product: IProductRequisitionInfo) => {
    deleteProductToRequisition(product)
  }

  const columns = useColumnsConfirm(handleEditRequest, handleDeleteProduct)

  const transformRequisitionToApiFormat = (requisition: IProductRequirementInfoCreate) => {
    return {
      code: requisition.code,
      companySlug: requisition.company.slug,
      siteSlug: requisition.site.slug,
      projectSlug: requisition.project.slug,
      type: requisition.type,
      description: requisition.note || '',
      requestProducts: requisition.requestProducts.map((product) => ({
        productSlug: product.productSlug,
        requestQuantity: product.requestQuantity
      })),
      userApprovals: requisition.userApprovals.map((approval) => ({
        userSlug: approval.userSlug,
        roleApproval: approval.roleApproval
      }))
    }
  }

  const handleConfirm = () => {
    const requisition = getRequisition() as IProductRequirementInfoCreate
    const apiFormattedRequisition = transformRequisitionToApiFormat(requisition)
    onConfirm(apiFormattedRequisition)
  }

  return (
    <div className="mt-3">
      <div className="flex flex-col justify-center gap-4">
        <div className="grid items-center justify-between grid-cols-6 py-3 mb-4 border-b-2">
          {getRequisition()?.company.name === 'TBE' ? (
            <img className="col-span-1" src={TbeLogo} height={56} width={56} />
          ) : getRequisition()?.company.name === 'Metek' ? (
            <img className="col-span-1" src={MetekLogo} height={64} width={64} />
          ) : (
            <img className="w-full col-span-1" src={SongnamLogo} />
          )}
          <span className="col-span-4 text-xl font-bold text-center text-normal font-beVietNam">
            {t('productRequisition.confirmProductRequisitions')}
          </span>
          <div className="col-span-1">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-1 p-1">
                <span>KMH:</span>
                <span>QR3-01/001</span>
              </div>
              <div className="flex flex-row gap-1 p-1">
                <span>Lần ban hành:</span>
                <span>1</span>
              </div>
            </div>
          </div>
        </div>
        {getRequisition() && (
          <div className="grid grid-cols-3 gap-3 mb-4 text-sm font-beVietNam">
            <div>
              <strong>Người yêu cầu: </strong>
              {requisition?.requester}
            </div>
            <div>
              <strong>Mã phiếu yêu cầu: </strong>
              {getRequisition()?.code}
            </div>
            <div>
              <strong>Công trình sử dụng: </strong>
              {requisition?.site.name}
            </div>
            <div>
              <strong>Dự án: </strong>
              {requisition?.project.name}
            </div>
            <div>
              <strong>Ghi chú: </strong>
              {requisition?.note}
            </div>
          </div>
        )}
      </div>
      <DataTableRequisition
        isLoading={false}
        columns={columns}
        data={getRequisition()?.requestProducts || []}
        pages={1}
        page={1}
        pageSize={requisition?.requestProducts?.length || 0}
        onPageChange={() => {}}
      />

      <div className="flex justify-end w-full gap-2 mt-4">
        <Button variant="outline" onClick={onBack}>
          {t('productRequisition.back')}
        </Button>
        <Button onClick={handleConfirm}>{t('productRequisition.confirm')}</Button>
      </div>
    </div>
  )
}
