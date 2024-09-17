import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useProductList } from '@/hooks'
import { IProductInfo, IProductNameSearch } from '@/types'

import { Button, DataTable, Label } from '@/components/ui'
import { CustomComponentRequest } from '@/views/product-requisitions/CustomComponentRequest'
import { useColumnsSearch } from '@/views/product-requisitions/DataTable/columnsSearch'
import { columnsResult } from '@/views/product-requisitions/DataTable/columnsResult'
import { showToast } from '@/utils'

interface IFormAddProductProps {
  onSubmit: (data: IProductNameSearch) => void
  onBack: () => void
  initialData?: IProductNameSearch | null
}

export const SearchProductForm: React.FC<IFormAddProductProps> = ({ onBack, onSubmit }) => {
  const { t } = useTranslation('productRequisition')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedProducts, setSelectedProducts] = useState<IProductInfo[]>([])

  const { data, isLoading } = useProductList({
    page,
    pageSize
  })

  const handleNext = () => {
    const productNameSearch: IProductNameSearch = {
      productName: selectedProducts.map((product) => product.productName).join(', ')
    }
    onSubmit(productNameSearch)
  }

  const handleAddRequest = (product: IProductInfo) => {
    const existingData = JSON.parse(localStorage.getItem('requestFormProducts') || '{}')
    const updatedData =
      typeof existingData === 'object' && existingData !== null ? existingData : {}
    const productsArray = Array.isArray(updatedData.products) ? updatedData.products : []
    const updatedProducts = [...productsArray, product]
    updatedData.products = updatedProducts
    localStorage.setItem('requestFormProducts', JSON.stringify(updatedData))
    setSelectedProducts(updatedProducts)
    showToast('Thêm vật tư thành công!')
  }

  useEffect(() => {
    const updateSelectedProducts = () => {
      const existingData = JSON.parse(localStorage.getItem('requestFormProducts') || '{}')
      const productsArray = Array.isArray(existingData.products) ? existingData.products : []
      setSelectedProducts(productsArray)
    }

    updateSelectedProducts()

    window.addEventListener('storage', updateSelectedProducts)
    return () => {
      window.removeEventListener('storage', updateSelectedProducts)
    }
  }, [])

  return (
    <div className="flex flex-col w-full gap-4 mt-3">
      <DataTable
        isLoading={isLoading}
        columns={useColumnsSearch(handleAddRequest)}
        data={data?.items || []}
        total={data?.total || 0}
        pages={data?.pages || 0}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        CustomComponent={(props) => (
          <CustomComponentRequest {...props} handleAddRequest={handleAddRequest} />
        )}
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
            total={selectedProducts.length}
            pages={1}
            page={1}
            pageSize={selectedProducts.length}
            onPageChange={() => {}}
            onPageSizeChange={() => {}}
            CustomComponent={(props) => (
              <CustomComponentRequest {...props} handleAddRequest={handleAddRequest} />
            )}
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
