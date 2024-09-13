import { useState, useEffect } from 'react'

import { useMultiStep } from '@/hooks'
import { useProductList } from '@/hooks'
import { IProductInfo, IProductNameSearch } from '@/types'

import { Button, DataTable, Label } from '@/components/ui'
import { CustomComponentRequest } from '@/views/product-requisitions/CustomComponentRequest'
import { columnsSearch } from '@/views/product-requisitions/DataTable/columnsSearch'
import { columnsResult } from '@/views/product-requisitions/DataTable/columnsResult'

interface IFormAddProductProps {
  onSubmit: (data: IProductNameSearch) => void
  onBack: (step: number) => void
  initialData?: IProductNameSearch | null
}

export const SearchProductForm: React.FC<IFormAddProductProps> = ({ onBack }) => {
  const { currentStep, handleStepChange } = useMultiStep(1)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedProducts, setSelectedProducts] = useState<IProductInfo[]>([])

  const { data } = useProductList({
    page,
    pageSize
  })

  const handleBack = () => {
    onBack(1)
  }

  const handleNext = () => {
    console.log('Current step in handleNext:', currentStep)
    handleStepChange(3)
  }

  const handleAddRequest = (product: IProductInfo) => {
    console.log('Product added:', product)
    const existingData = JSON.parse(localStorage.getItem('requestFormProducts') || '{}')
    const updatedData =
      typeof existingData === 'object' && existingData !== null ? existingData : {}
    const productsArray = Array.isArray(updatedData.products) ? updatedData.products : []
    const updatedProducts = [...productsArray, product]
    updatedData.products = updatedProducts
    localStorage.setItem('requestFormProducts', JSON.stringify(updatedData))
    setSelectedProducts(updatedProducts) // Update state with selected products
  }

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem('requestFormProducts') || '{}')
    const productsArray = Array.isArray(existingData.products) ? existingData.products : []
    setSelectedProducts(productsArray)
  }, [])

  return (
    <div className="flex flex-col w-full gap-4 mt-3">
      <DataTable
        columns={columnsSearch(handleAddRequest)}
        data={data?.items || []}
        total={data?.total || 0}
        pages={data?.pages || 0}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        CustomComponent={CustomComponentRequest}
      />

      <div className="flex flex-col gap-2 p-4 border rounded-md">
        <Label className="text-lg font-semibold leading-none tracking-tight font-beVietNam">
          Danh sách vật tư đã thêm vào phiếu yêu cầu
        </Label>
        <span className="text-sm text-muted-foreground">Công ty Cổ phần Công nghệ Mekong</span>
        <div className="flex flex-col gap-2">
          <DataTable
            columns={columnsResult()}
            data={selectedProducts} // Use selected products for the second DataTable
            total={selectedProducts.length}
            pages={1}
            page={1}
            pageSize={selectedProducts.length}
            onPageChange={() => {}}
            onPageSizeChange={() => {}}
            CustomComponent={CustomComponentRequest}
          />
        </div>
      </div>
      <div className="flex items-center justify-end w-full gap-2 mt-4">
        <Button variant="outline" onClick={handleBack}>
          Trở lại
        </Button>
        <Button onClick={handleNext}>Tiếp theo</Button>
      </div>
    </div>
  )
}
