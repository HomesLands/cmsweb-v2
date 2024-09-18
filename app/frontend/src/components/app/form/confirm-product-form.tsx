import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { Button, DataTableRequisition } from '@/components/ui'
import { IProductInfo, IProductRequirementInfoCreate } from '@/types'
import { TbeLogo } from '@/assets/images'
import { useColumnsConfirm } from '@/views/product-requisitions/DataTable/columnsConfirm'
import { showToast } from '@/utils'

interface IConfirmProductFormProps {
  onConfirm: (data: IProductRequirementInfoCreate) => void
  onBack: () => void
}

export const ConfirmProductForm: React.FC<IConfirmProductFormProps> = ({ onConfirm, onBack }) => {
  const [localData, setLocalData] = useState<IProductRequirementInfoCreate | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<IProductInfo[]>([])
  const { t } = useTranslation('productRequisition')

  useEffect(() => {
    const storedProducts = localStorage.getItem('requestFormProducts')
    if (storedProducts) {
      try {
        const parsedData = JSON.parse(storedProducts)
        setLocalData(parsedData)
      } catch (error) {
        console.error('Error parsing stored products', error)
      }
    }
  }, [])

  const handleEditRequest = (product: IProductInfo) => {
    const existingData = JSON.parse(localStorage.getItem('requestFormProducts') || '{}')

    if (existingData && Array.isArray(existingData.products)) {
      const productIndex = existingData.products.findIndex(
        (p: IProductInfo) => p.code === product.code
      )

      if (productIndex !== -1) {
        existingData.products[productIndex] = product
        localStorage.setItem('requestFormProducts', JSON.stringify(existingData))
        setSelectedProducts(existingData.products)
        showToast('Chỉnh sửa thông tin vật tư thành công!')
      } else {
        showToast('Không tìm thấy sản phẩm để chỉnh sửa!')
      }
    } else {
      showToast('Dữ liệu sản phẩm không hợp lệ!')
    }
  }

  const handleDeleteProduct = (product: IProductInfo) => {
    const existingData = JSON.parse(localStorage.getItem('requestFormProducts') || '{}')
    const updatedData =
      typeof existingData === 'object' && existingData !== null ? existingData : {}
    const productsArray = Array.isArray(updatedData.products) ? updatedData.products : []

    const updatedProducts = productsArray.filter((p: IProductInfo) => p.code !== product.code)

    updatedData.products = updatedProducts
    localStorage.setItem('requestFormProducts', JSON.stringify(updatedData))
    setSelectedProducts(updatedProducts)

    showToast('Xóa vật tư thành công!')
  }

  useEffect(() => {
    if (localData) {
      setSelectedProducts(localData.products)
    }
  }, [localData])

  const columns = useColumnsConfirm(handleEditRequest, handleDeleteProduct)

  const handleConfirm = () => {
    if (localData) {
      onConfirm(localData)
    }
  }

  return (
    <div className="mt-3">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-row items-center justify-between py-3 border-b-2">
          <img src={TbeLogo} height={56} width={56} />
          <span className="text-xl font-bold text-normal font-beVietNam">
            {t('productRequisition.confirmProductRequisitions')}
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row p-2 border rounded-md">
              <span>KMH</span>
              <span>QR3-01/001</span>
            </div>
            <div className="flex flex-row p-2 border rounded-md">
              <span>Lần ban hành</span>
              <span>1</span>
            </div>
          </div>
        </div>
        {localData && (
          <div className="grid grid-cols-3 gap-3 mb-3 text-sm font-beVietNam">
            <div>
              <strong>Ngày yêu cầu: </strong>
              {format(new Date(localData.createdAt), 'HH:mm dd/MM/yyyy')}
            </div>
            <div>
              <strong>Người yêu cầu: </strong>
              {localData.requester}
            </div>
            <div>
              <strong>Mã hóa đơn: </strong>
              {localData.requestCode}
            </div>
            <div>
              <strong>Công trình sử dụng: </strong>
              {localData.site.name}
            </div>
            <div>
              <strong>Dự án: </strong>
              {localData.project.name}
            </div>
            <div>
              <strong>Ghi chú: </strong>
              {localData.note}
            </div>
          </div>
        )}
      </div>
      {localData && (
        <DataTableRequisition
          isLoading={false}
          columns={columns}
          data={selectedProducts}
          // total={selectedProducts.length}
          pages={1}
          page={1}
          pageSize={selectedProducts.length}
          onPageChange={() => {}}
        />
      )}

      <div className="flex justify-end w-full gap-2 mt-4">
        <Button variant="outline" onClick={onBack}>
          {t('productRequisition.back')}
        </Button>
        <Button onClick={handleConfirm}>{t('productRequisition.confirm')}</Button>
      </div>
    </div>
  )
}
