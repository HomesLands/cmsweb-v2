import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { DataTableRequisition, Label, Button } from '@/components/ui'
import { useProductRequisitionBySlug } from '@/hooks'

import { TbeLogo } from '@/assets/images'
import { MetekLogo } from '@/assets/images'
import { SongnamLogo } from '@/assets/images'
import { useColumnsDetail } from './DataTable/columnsDetail'
import {
  ApprovalLogStatus,
  IApproveProductRequisition,
  IProductRequisitionInfo,
  IRequisitionFormResponseForApprover,
  RequestRequisitionRoleApproval
} from '@/types'
import { DialogApprovalRequisition } from '@/components/app/dialog'
import { showToast } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { approveProductRequisition } from '@/api'
import { ApprovalAction, RequisitionStatus, UserApprovalStage } from '@/constants'

const ApprovalProductRequisitionDetail: React.FC = () => {
  const navigate = useNavigate()
  const { t: tToast } = useTranslation('toast')
  const { t } = useTranslation(['productRequisition'])
  const { slug } = useParams<{ slug: string }>()
  const { data } = useProductRequisitionBySlug(slug!)
  const location = useLocation()
  const selectedRequisition = location.state?.selectedRequisition as
    | IRequisitionFormResponseForApprover
    | undefined
  console.log('form slug: ', data?.result.slug)
  console.log('approval user slug: ', selectedRequisition?.approvalUserSlug)

  const { roleApproval } = selectedRequisition || {}

  const columns = useColumnsDetail()

  const [openDialog, setOpenDialog] = useState<'accept' | 'give_back' | 'cancel' | null>(null)

  const buttonStates = useMemo(() => {
    if (!data?.result || !selectedRequisition) return {}
    if (!data?.result || !selectedRequisition) return {}

  if (!data?.result || !selectedRequisition) return {}

  const { status, isRecalled } = data.result

    const { roleApproval } = selectedRequisition

    let acceptEnabled = false
    let giveBackEnabled = false
    let cancelEnabled = false

    // Nếu đã duyệt bước 2 và không bị recall, disable tất cả các nút
    // if (status === 'accepted_stage_2' && !isRecalled) {
    //   return { acceptEnabled, giveBackEnabled, cancelEnabled }
    // }

    switch (roleApproval) {
      case UserApprovalStage.APPROVAL_STAGE_1:
        acceptEnabled = status === RequisitionStatus.WAITING && !isRecalled
        giveBackEnabled = status === RequisitionStatus.WAITING && !isRecalled
        break
      case UserApprovalStage.APPROVAL_STAGE_2:
      case UserApprovalStage.APPROVAL_STAGE_3:
        acceptEnabled = ['accepted_stage_1', 'accepted_stage_2'].includes(status)
        giveBackEnabled = ['accepted_stage_1', 'accepted_stage_2'].includes(status) && !isRecalled
        cancelEnabled = ['accepted_stage_1', 'accepted_stage_2'].includes(status)
        break
    }

    return { acceptEnabled, giveBackEnabled, cancelEnabled }
  }, [data?.result, selectedRequisition])

  const handleAccept = () => setOpenDialog(ApprovalAction.ACCEPT)
  const handleGiveBack = () => setOpenDialog(ApprovalAction.GIVE_BACK)
  const handleCancel = () => setOpenDialog(ApprovalAction.CANCEL)

  const mutation = useMutation({
    mutationFn: async (data: IApproveProductRequisition) => {
      return approveProductRequisition(
        data.formSlug,
        data.approvalUserSlug,
        data.approvalLogStatus,
        data.approvalLogContent
      )
    },
    onSuccess: (_, variables) => {
      let toastMessage = ''

      switch (roleApproval) {
        case UserApprovalStage.APPROVAL_STAGE_1:
          if (variables.approvalLogStatus === ApprovalAction.ACCEPT) {
            toastMessage = tToast('toast.approveRequestSuccess')
          } else if (variables.approvalLogStatus === ApprovalAction.GIVE_BACK) {
            toastMessage = tToast('toast.giveBackRequestSuccess')
          }
          break
        case UserApprovalStage.APPROVAL_STAGE_2:
        case UserApprovalStage.APPROVAL_STAGE_3:
          if (variables.approvalLogStatus === ApprovalAction.ACCEPT) {
            toastMessage = tToast('toast.approveRequestSuccess')
          } else if (variables.approvalLogStatus === ApprovalAction.GIVE_BACK) {
            toastMessage = tToast('toast.giveBackRequestSuccess')
          } else if (variables.approvalLogStatus === ApprovalAction.CANCEL) {
            toastMessage = tToast('toast.cancelRequestSuccess')
          }
          break
      }

      showToast(toastMessage)
    }
  })

  const handleConfirm = (message: string, status: ApprovalLogStatus) => {
    mutation.mutate({
      formSlug: data?.result.slug as string,
      approvalUserSlug: selectedRequisition?.approvalUserSlug as string,
      approvalLogStatus: status,
      approvalLogContent: message
    })

    setOpenDialog(null)
  }

  const requestProducts: IProductRequisitionInfo[] = Array.isArray(data?.result?.requestProducts)
    ? data.result.requestProducts
    : []

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
          <ReaderIcon className="header-icon" />
          {t('requisitionDetail.requestDetail')}
        </Label>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            {t('productRequisition.back')}
          </Button>
          {roleApproval === UserApprovalStage.APPROVAL_STAGE_1 && (
            <>
              <Button
                variant="outline"
                onClick={handleGiveBack}
                disabled={!buttonStates.giveBackEnabled}
              >
                {t('productRequisition.giveBack')}
              </Button>
              <Button
                variant="default"
                onClick={handleAccept}
                disabled={!buttonStates.acceptEnabled}
              >
                {t('productRequisition.accept')}
              </Button>
            </>
          )}
          {(roleApproval === UserApprovalStage.APPROVAL_STAGE_2 || roleApproval === UserApprovalStage.APPROVAL_STAGE_3) && (
            <>
              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={!buttonStates.cancelEnabled}
              >
                {t('productRequisition.cancel')}
              </Button>
              <Button
                variant="outline"
                onClick={handleGiveBack}
                disabled={!buttonStates.giveBackEnabled}
              >
                {t('productRequisition.giveBack')}
              </Button>
              <Button
                variant="default"
                onClick={handleAccept}
                disabled={!buttonStates.acceptEnabled}
              >
                {t('productRequisition.accept')}
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="mt-3">
        <div className="flex flex-col justify-center gap-4">
          <div className="grid items-center justify-between grid-cols-6 py-3 mb-4 border-b-2">
            {data?.result?.company.includes('Thái Bình') ? (
              <div className="w-full col-span-1">
                <img src={TbeLogo} height={72} width={72} />
              </div>
            ) : data?.result?.company.includes('Mekong') ? (
              <div className="w-full col-span-1">
                <img src={MetekLogo} height={150} width={150} />
              </div>
            ) : (
              <div className="w-full col-span-1">
                <img src={SongnamLogo} height={72} width={72} />
              </div>
            )}
            <span className="col-span-4 text-2xl font-extrabold text-center uppercase text-normal font-beVietNam">
              {t('productRequisition.confirmProductRequisitions')}
            </span>
            <div className="col-span-1">
              <div className="flex flex-col text-xs font-beVietNam">
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
          data={requestProducts}
          pages={1}
          page={1}
          pageSize={requestProducts.length}
          onPageChange={() => {}}
        />

        <DialogApprovalRequisition
          openDialog={openDialog as ApprovalAction}
          setOpenDialog={setOpenDialog}
          onConfirm={handleConfirm}
          roleApproval={roleApproval as RequestRequisitionRoleApproval}
        />
      </div>
    </div>
  )
}

export default ApprovalProductRequisitionDetail
