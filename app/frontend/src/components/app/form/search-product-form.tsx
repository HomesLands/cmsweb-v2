import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useRequisitionStore } from '@/stores'
import { useProducts } from '@/hooks'
import { IProductNameSearch, IProductQuery, IProductRequisitionInfo } from '@/types'

import { Button, DataTable, DataTableRequisition, Label } from '@/components/ui'
import { CustomComponentRequest } from '@/views/product-requisitions/CustomComponentRequest'
import { useColumnsSearch } from '@/views/product-requisitions/DataTable/columnsSearch'
import { useColumnsResult } from '@/views/product-requisitions/DataTable/columnsResult'

interface IFormAddProductProps {
  onSubmit: (data: IProductNameSearch) => void
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
  const [selectedProducts, setSelectedProducts] = useState<IProductRequisitionInfo[]>([])
  const { requisition } = useRequisitionStore()

  const { data: allProduct, isLoading } = useProducts(query)

  const { updateProductToRequisition, deleteProductToRequisition } = useRequisitionStore()

  const handleEditRequisition = (product: IProductRequisitionInfo) => {
    updateProductToRequisition(product, product.requestQuantity)
  }

  const handleDeleteProduct = (product: IProductRequisitionInfo) => {
    deleteProductToRequisition(product)
  }

  const handleNext = () => {
    const productNameSearch: IProductNameSearch = {
      name: selectedProducts.map((product) => product.name).join(', ')
    }
    onSubmit(productNameSearch)
  }

  const columns = useColumnsResult(handleEditRequisition, handleDeleteProduct)

  return (
    <div className="flex flex-col w-full gap-4 mt-3">
      <DataTable
        isLoading={isLoading}
        columns={useColumnsSearch()}
        data={allProduct?.result?.items || []}
        pages={allProduct?.result?.totalPages || 0}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        CustomComponent={(props) => <CustomComponentRequest {...props} />}
      />

      <div className="flex flex-col gap-2">
        <Label className="text-lg font-semibold leading-none tracking-tight font-beVietNam">
          {t('productRequisition.addedProductToRequest')}
        </Label>
        <span className="text-sm text-muted-foreground">
          {t('productRequisition.addedProductToRequestDescription')}
        </span>
        <div className="flex flex-col gap-2">
          <DataTableRequisition
            isLoading={isLoading}
            columns={columns}
            data={requisition?.requestProducts || []}
            pages={1}
            page={1}
            pageSize={requisition?.requestProducts?.length || 0}
            onPageChange={() => {}}
            onPageSizeChange={() => {}}
            CustomComponent={undefined}
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
