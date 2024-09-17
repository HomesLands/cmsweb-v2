import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { Button, DataTable } from '@/components/ui'
import { IProductInfo, IProductRequirementInfoCreate } from '@/types'
import { TbeLogo } from '@/assets/images'
import { columnsConfirm } from '@/views/product-requisitions/DataTable/columnsConfirm'

interface IConfirmProductFormProps {
  data: IProductRequirementInfoCreate
  onConfirm: (data: IProductRequirementInfoCreate) => void
  onBack: () => void
}

export const ConfirmProductForm: React.FC<IConfirmProductFormProps> = ({
  data,
  onConfirm,
  onBack
}) => {
  const [localData, setLocalData] = useState<IProductRequirementInfoCreate | null>(null)
  const { t } = useTranslation('productRequisition')

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

  const handleConfirm = () => {
    onConfirm(data)
  }

  return (
    <div className="mt-3">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-row items-center justify-between py-2 border-b-2">
          <img src={TbeLogo} height={44} width={44} />
          <span className="text-xl font-bold text-normal font-beVietNam">
            {t('productRequisition.confirmProductRequisitions')}
          </span>
          <div className="flex flex-col">
            <div className="flex flex-row mt-6 border">
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
          <div className="grid grid-cols-3 gap-2 mb-3">
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
        <DataTable
          isLoading={false}
          columns={columnsConfirm()}
          data={localData.products}
          total={localData.products.length}
          pages={1}
          page={1}
          pageSize={localData.products.length}
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
