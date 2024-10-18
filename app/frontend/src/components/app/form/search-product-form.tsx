import { useTranslation } from 'react-i18next'

import { useRequisitionStore } from '@/stores'
import { useDebouncedInput, usePagination, useProducts } from '@/hooks'
import { IProductRequisitionInfo } from '@/types'

import { Button, DataTable, Label } from '@/components/ui'
import {
  ProductActionOptions,
  useColumnsSearchProduct,
  useColumnsResult
} from '@/views/product-requisitions/data-table'

interface IFormAddProductProps {
  onSubmit: () => void
  onBack: () => void
}

export const SearchProductForm: React.FC<IFormAddProductProps> = ({ onBack, onSubmit }) => {
  const { t } = useTranslation('productRequisition')
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination({
    isSearchParams: false
  })
  const { requisition } = useRequisitionStore()
  const { inputValue, setInputValue, debouncedInputValue } = useDebouncedInput()

  const { data: allProduct, isLoading } = useProducts({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    order: 'DESC',
    searchTerm: debouncedInputValue
  })

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
    <div className="flex flex-col gap-4 mt-3 w-full">
      <DataTable
        isLoading={isLoading}
        columns={useColumnsSearchProduct()}
        data={allProduct?.result?.items || []}
        pages={allProduct?.result?.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        actionOptions={ProductActionOptions}
        inputValue={inputValue}
        onInputChange={setInputValue}
        hiddenInput={false} // default true
      />

      <div className="flex flex-col gap-2">
        <Label className="text-lg font-semibold tracking-tight leading-none font-beVietNam">
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
      <div className="flex gap-2 justify-end items-center mt-4 w-full">
        <Button variant="outline" onClick={onBack}>
          {t('productRequisition.back')}
        </Button>
        <Button onClick={handleNext}>{t('productRequisition.next')}</Button>
      </div>
    </div>
  )
}
