import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircledIcon, CheckIcon, ReaderIcon } from '@radix-ui/react-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { DataTable, DataTableRequisition, Label } from '@/components/ui'
import { useColumnsRequisitionList } from './DataTable/columns'
import { usePagination, useProductRequisitionBySlug } from '@/hooks'
import { CustomComponent } from './CustomComponent'
import { IRequisitionFormResponseForApprover } from '@/types'
import { getProductRequisitionBySlug } from '@/api'
import { useColumnsConfirm } from '@/views/product-requisitions/DataTable/columnsConfirm'

import { TbeLogo } from '@/assets/images'
import { MetekLogo } from '@/assets/images'
import { SongnamLogo } from '@/assets/images'
import { useColumnsDetail } from './DataTable/columnsDetail'
import { Button } from '@/components/ui'
import { RotateCcw, XIcon } from 'lucide-react'

const ProductRequisitionsDetail: React.FC = () => {
  const { t } = useTranslation(['productRequisition'])
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading } = useProductRequisitionBySlug(slug!)
  const navigate = useNavigate()

  console.log(data?.result?.requestProducts)

  const columns = useColumnsDetail()

  const handleApprove = () => {
    // Logic xử lý duyệt yêu cầu
    console.log('Yêu cầu được duyệt')
  }

  const handleReject = () => {
    // Logic xử lý từ chối yêu cầu
    console.log('Yêu cầu bị từ chối')
  }

  const handleReturn = () => {
    // Logic xử lý hoàn lại cấp trước
    console.log('Yêu cầu được hoàn lại cấp trước')
  }

  const handleCancel = () => {
    // Logic xử lý hủy yêu cầu
    console.log('Yêu cầu bị hủy')
  }

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center justify-between gap-1 font-semibold text-normal text-md font-beVietNam">
        <div className="flex items-center gap-1">
          <ReaderIcon className="header-icon" />
          {t('requisitionDetail.requestDetail')}
        </div>
        <div className="flex justify-end gap-4 mt-6">
          {/* <Button variant="outline" onClick={() => navigate(-1)}>
          {t('productRequisition.back')}
        </Button> */}
          <Button variant="destructive" onClick={handleCancel}>
            {/* <XIcon className="w-4 h-4 mr-1" /> */}
            {t('productRequisition.reject')}
          </Button>
          <Button variant="outline" onClick={handleReject}>
            {/* <RotateCcw className="w-4 h-4 mr-1" /> */}
            {t('productRequisition.returnToReview')}
          </Button>
          <Button variant="default" onClick={handleApprove}>
            {/* <CheckIcon className="w-4 h-4 mr-1" /> */}
            {t('productRequisition.approve')}
          </Button>
        </div>
      </Label>
      <div className="mt-3">
        <div className="flex flex-col justify-center gap-4">
          <div className="grid items-center justify-between grid-cols-6 py-3 mb-4 border-b-2">
            {data?.result?.company.includes('Thái Bình') ? (
              <img className="w-full col-span-1" src={TbeLogo} height={56} width={56} />
            ) : data?.result?.company.includes('Mekong') ? (
              <img className="w-full col-span-1" src={MetekLogo} height={64} width={64} />
            ) : (
              <img className="w-full col-span-1" src={SongnamLogo} />
            )}
            <span className="col-span-4 text-xl font-bold text-center text-normal font-beVietNam">
              {t('productRequisition.confirmProductRequisitions')}
            </span>
            <div className="col-span-1">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-1 p-1">
                  <span>KMH:</span>
                  <span>QR3-01/001</span>
                </div>
                <div className="flex flex-row gap-1 p-1">
                  <span>Lần ban hành:</span>
                  <span>1</span>
                </div>
              </div>
            </div>
          </div>
          {data?.result && (
            <div className="grid grid-cols-3 gap-3 mb-4 text-sm font-beVietNam">
              <div>
                <strong>Mức yêu tiên: </strong>
                <span className={data?.result?.type === 'urgent' ? 'text-red-600 font-bold' : ''}>
                  {data?.result?.type === 'normal' ? 'Bình thường' : 'Cần gấp'}
                </span>
              </div>
              <div>
                <strong>Mã phiếu yêu cầu: </strong>
                {data?.result?.code}
              </div>
              <div>
                <strong>Người yêu cầu: </strong>
                {data?.result?.creator}
              </div>
              <div>
                <strong>Công trình sử dụng: </strong>
                {data?.result?.site}
              </div>
              <div>
                <strong>Dự án: </strong>
                {data?.result?.project}
              </div>
              <div>
                <strong>Ghi chú: </strong>
                {data?.result?.description}
              </div>
            </div>
          )}
        </div>
        <DataTableRequisition
          isLoading={false}
          columns={columns}
          data={data?.result?.requestProducts || []}
          pages={1}
          page={1}
          pageSize={data?.result?.requestProducts?.length || 0}
          onPageChange={() => {}}
        />

        {/* <div className="flex justify-end w-full gap-2 mt-4">
        <Button variant="outline" onClick={onBack}>
          {t('productRequisition.back')}
        </Button>
        <Button onClick={handleConfirm}>{t('productRequisition.confirm')}</Button>
      </div> */}
      </div>
    </div>
  )
}

export default ProductRequisitionsDetail
