import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useRequisitionStore } from '@/stores'
import { useProducts } from '@/hooks'
import { IProductQuery, IProductRequisitionInfo } from '@/types'

import { Button, DataTable, Label } from '@/components/ui'
import {
  ProductActionOptions,
  useColumnsSearch,
  useColumnsResult
} from '@/views/product-requisitions/data-table'

interface IFormAddProductProps {
  onSubmit: () => void
  onBack: () => void
}

export const SearchProductForm: React.FC<IFormAddProductProps> = ({ onBack, onSubmit }) => {
  const { t } = useTranslation('productRequisition')
  const [query, setQuery] = useState<IProductQuery>({
    order: 'DESC',
    page: 1,
    pageSize: 10,
    searchTerm: ''
  })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { requisition } = useRequisitionStore()

  const { data: allProduct, isLoading } = useProducts(query)

  const { updateProductToRequisition, deleteProductToRequisition } = useRequisitionStore()

  const handleEditProduct = (product: IProductRequisitionInfo) => {
    updateProductToRequisition(product, product.requestQuantity)
  }

  const handleDeleteProduct = (product: IProductRequisitionInfo) => {
    deleteProductToRequisition(product)
  }

  const handleNext = () => {
    onSubmit()
  }

  const columns = useColumnsResult(handleEditProduct, handleDeleteProduct)

  return (
    <div className="flex flex-col w-full gap-4 mt-3">
      <DataTable
        isLoading={isLoading}
        columns={useColumnsSearch()}
        data={allProduct?.result?.items || []}
        pages={allProduct?.result?.totalPages || 0}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        actionOptions={ProductActionOptions}
      />

      <div className="flex flex-col gap-2">
        <Label className="text-lg font-semibold leading-none tracking-tight font-beVietNam">
          {t('productRequisition.addedProductToRequest')}
        </Label>
        <span className="text-sm text-muted-foreground">
          {t('productRequisition.addedProductToRequestDescription')}
        </span>
        <div className="flex flex-col gap-2">
          <DataTable
            isLoading={isLoading}
            columns={columns}
            data={requisition?.requestProducts || []}
            pages={1}
            onPageChange={() => {}}
            onPageSizeChange={() => {}}
          />
        </div>
      </div>
      <div className="flex items-center justify-end w-full gap-2 mt-4">
        <Button variant="outline" onClick={onBack}>
          {t('productRequisition.back')}
        </Button>
        <Button onClick={handleNext}>{t('productRequisition.next')}</Button>
      </div>
    </div>
  )
}
