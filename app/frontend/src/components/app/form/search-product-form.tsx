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

  const handleNext = () => {
    onSubmit()
  }

  const columns = useColumnsResult()

  return (
    <div className="flex flex-col w-full gap-4 mt-3">
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
