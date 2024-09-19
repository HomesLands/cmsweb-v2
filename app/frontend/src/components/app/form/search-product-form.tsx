import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useProducts } from '@/hooks'
import { IProductInfo, IProductNameSearch, IProductQuery } from '@/types'

import { Button, DataTable, Label } from '@/components/ui'
import { CustomComponentRequest } from '@/views/product-requisitions/CustomComponentRequest'
import { useColumnsSearch } from '@/views/product-requisitions/DataTable/columnsSearch'
import { columnsResult } from '@/views/product-requisitions/DataTable/columnsResult'
import { useRequisitionStore } from '@/stores'

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
  const [order, setOrder] = useState('DESC')
  const [selectedProducts, setSelectedProducts] = useState<IProductInfo[]>([])

  const { data: allProduct, isLoading } = useProducts(query)

  const handleNext = () => {
    const productNameSearch: IProductNameSearch = {
      productName: selectedProducts.map((product) => product.name).join(', ')
    }
    onSubmit(productNameSearch)
  }

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

      <div className="flex flex-col gap-2 p-4 border rounded-md">
        <Label className="text-lg font-semibold leading-none tracking-tight font-beVietNam">
          {t('productRequisition.addedProductToRequest')}
        </Label>
        <span className="text-sm text-muted-foreground">
          {t('productRequisition.addedProductToRequestDescription')}
        </span>
        <div className="flex flex-col gap-2">
          <DataTable
            isLoading={isLoading}
            columns={columnsResult()}
            data={selectedProducts}
            pages={1}
            page={1}
            pageSize={selectedProducts.length}
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
