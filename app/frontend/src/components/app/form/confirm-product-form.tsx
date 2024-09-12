import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui'
import { IProductInfo, IProductRequirementInfoCreate } from '@/types'

import { TbeLogo } from '@/assets/images'

interface IConfirmProductFormProps {
  data: IProductRequirementInfoCreate
  onConfirm: () => void
  onBack: () => void
}

export const ConfirmProductForm: React.FC<IConfirmProductFormProps> = ({
  data,
  onConfirm,
  onBack
}) => {
  const [localData, setLocalData] = useState<IProductRequirementInfoCreate | null>(null)

  useEffect(() => {
    const storedProducts = localStorage.getItem('requestFormProducts')
    console.log('Check storedProducts: ', storedProducts)
    if (storedProducts) {
      try {
        const parsedData = JSON.parse(storedProducts)
        setLocalData(parsedData)
      } catch (error) {
        console.error('Error parsing stored products', error)
      }
    }
  }, [])

  console.log('Check data: ', data)
  return (
    <div className="mt-3">
      <div className="flex flex-col justify-center gap-3">
        <div className="flex flex-row items-center justify-between">
          <img src={TbeLogo} height={44} width={44} />
          <span className="text-lg text-normal">Phiếu yêu cầu vật tư</span>
          <div className="flex flex-col">
            <div className="flex flex-row border">
              <span>KMH</span>
              <span>QR3-01/001</span>
            </div>
            <div className="flex flex-row border">
              <span>Lần ban hành</span>
              <span>1</span>
            </div>
          </div>
        </div>
        {localData && (
          <div className="grid grid-cols-3 gap-2">
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
              {localData.construction}
            </div>
            <div>
              <strong>Dự án: </strong>
              {localData.project}
            </div>
            <div>
              <strong>Ghi chú: </strong>
              {localData.note}
            </div>
          </div>
        )}
      </div>
      {localData &&
        localData.products.map((product: IProductInfo) => (
          <div key={product.id} className="mb-2">
            <strong>Sản phẩm:</strong> {product.productName}
            <br />
            <strong>Mã sản phẩm:</strong> {product.productCode}
            <br />
            <strong>Người tạo:</strong> {product.createdBy}
            <br />
          </div>
        ))}

      <div className="flex justify-end w-full gap-2 mt-4">
        <Button variant="outline" onClick={onBack}>
          Trở lại
        </Button>
        <Button onClick={onConfirm}>Xác nhận</Button>
      </div>
    </div>
  )
}
