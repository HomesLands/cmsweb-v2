import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReaderIcon } from '@radix-ui/react-icons'
import { useNavigate, useParams } from 'react-router-dom'

import { Label, Button, DataTable } from '@/components/ui'
import { useProductRequisitionBySlug } from '@/hooks'

import { useColumnsDetail, useColumnsApprovalLog } from './data-table'
import { ApprovalLogStatus, IApproveProductRequisition, IProductInfo } from '@/types'
import { DialogApprovalRequisition } from '@/components/app/dialog'
import { showToast } from '@/utils'
import { approveProductRequisition } from '@/api'
import { ApprovalAction, baseURL, RequisitionStatus } from '@/constants'

const ApprovalProductRequisitionDetail: React.FC = () => {
  const navigate = useNavigate()
  const { t: tToast } = useTranslation('toast')
  const { t } = useTranslation(['productRequisition'])
  const { slug } = useParams<{ slug: string }>()
  const { data } = useProductRequisitionBySlug(slug!)

  const columns = useColumnsDetail()
  const columnsApprovalLog = useColumnsApprovalLog()
  const [openDialog, setOpenDialog] = useState<'accept' | 'give_back' | 'cancel' | null>(null)

  const buttonStates = useMemo(() => {
    if (!data?.result) return {}

    const { status, isRecalled } = data.result

    let acceptEnabled = false
    let giveBackEnabled = false
    let cancelEnabled = false
    let showButtons = true
    let approvalStage = 0

    if (status === RequisitionStatus.WAITING && !isRecalled) {
      // Vừa tạo, đang chờ duyệt bước 1
      approvalStage = 1
      acceptEnabled = true
      giveBackEnabled = true
    } else if (status === RequisitionStatus.CANCEL && isRecalled) {
      // Đã bị hoàn ở bước 1
      showButtons = false
    } else if (status === RequisitionStatus.ACCEPTED_STAGE_1 && !isRecalled) {
      // Đã duyệt bước 1
      approvalStage = 2
      acceptEnabled = true
      giveBackEnabled = true
      cancelEnabled = true
    } else if (status === RequisitionStatus.WAITING && isRecalled) {
      // Đã bị hoàn ở bước 2
      approvalStage = 2
      acceptEnabled = true
      giveBackEnabled = true
      cancelEnabled = true
    } else if (status === RequisitionStatus.ACCEPTED_STAGE_2 && !isRecalled) {
      // Đã duyệt bước 2
      approvalStage = 3
      acceptEnabled = true
      giveBackEnabled = true
      cancelEnabled = true
    } else if (status === RequisitionStatus.ACCEPTED_STAGE_1 && isRecalled) {
      // Đã bị hoàn ở bước 3
      approvalStage = 3
      acceptEnabled = true
      giveBackEnabled = true
      cancelEnabled = true
    } else if (status === RequisitionStatus.WAITING_EXPORT || status === RequisitionStatus.CANCEL) {
      // Đã duyệt bước 3 hoặc Đã bị hủy
      showButtons = false
    }

    return { acceptEnabled, giveBackEnabled, cancelEnabled, showButtons, approvalStage }
  }, [data?.result])

  const userApprovals = useMemo(() => {
    return Array.isArray(data?.result?.userApprovals) ? data.result.userApprovals : []
  }, [data])

  const sortedUserApprovals = useMemo(() => {
    const approvalOrder = {
      approval_stage_1: 1,
      approval_stage_2: 2,
      approval_stage_3: 3
    }

    return [...userApprovals].sort((a, b) => {
      const orderA =
        approvalOrder[a.assignedUserApproval.roleApproval as keyof typeof approvalOrder] || 0
      const orderB =
        approvalOrder[b.assignedUserApproval.roleApproval as keyof typeof approvalOrder] || 0
      return orderA - orderB
    })
  }, [userApprovals])

  const handleAccept = () => setOpenDialog(ApprovalAction.ACCEPT)
  const handleGiveBack = () => setOpenDialog(ApprovalAction.GIVE_BACK)
  const handleCancel = () => setOpenDialog(ApprovalAction.CANCEL)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: IApproveProductRequisition) => {
      return approveProductRequisition(data.formSlug, data.approvalLog)
    },
    onSuccess: (_, variables) => {
      let toastMessage = ''

      switch (variables.approvalLog.status) {
        case ApprovalAction.ACCEPT:
          toastMessage = tToast('toast.approveRequestSuccess')
          break
        case ApprovalAction.GIVE_BACK:
          toastMessage = tToast('toast.giveBackRequestSuccess')
          break
        case ApprovalAction.CANCEL:
          toastMessage = tToast('toast.cancelRequestSuccess')
          break
      }

      showToast(toastMessage)

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['productRequisitionBySlug', slug] })
    }
  })

  const handleConfirm = (message: string, status: ApprovalLogStatus) => {
    mutation.mutate({
      formSlug: data?.result.slug as string,
      approvalLog: {
        status: status,
        content: message
      }
    })

    setOpenDialog(null)
  }

  const getLogoUrl = () => {
    if (data?.result?.creator.userDepartments[0].department.site.company.logo)
      return `${baseURL}/files/${data?.result?.creator.userDepartments[0].department.site.company.logo}`
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 justify-between items-start sm:flex-row sm:items-center sm:gap-0">
        <Label className="flex gap-1 items-center mb-2 font-semibold text-normal text-md font-beVietNam sm:mb-0">
          <ReaderIcon className="header-icon" />
          {t('requisitionDetail.requestDetail')}
        </Label>
        <div className="flex flex-row gap-2 justify-end sm:gap-4">
          <Button variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-auto">
            {t('productRequisition.back')}
          </Button>
          {buttonStates.showButtons && (
            <>
              {buttonStates.approvalStage === 1 ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleGiveBack}
                    disabled={!buttonStates.giveBackEnabled}
                    className="w-full sm:w-auto"
                  >
                    {t('productRequisition.giveBack')}
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleAccept}
                    disabled={!buttonStates.acceptEnabled}
                    className="w-full sm:w-auto"
                  >
                    {t('productRequisition.accept')}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="destructive"
                    onClick={handleCancel}
                    disabled={!buttonStates.cancelEnabled}
                    className="w-full sm:w-auto"
                  >
                    {t('productRequisition.cancel')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleGiveBack}
                    disabled={!buttonStates.giveBackEnabled}
                    className="w-full sm:w-auto"
                  >
                    {t('productRequisition.giveBack')}
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleAccept}
                    disabled={!buttonStates.acceptEnabled}
                    className="w-full sm:w-auto"
                  >
                    {t('productRequisition.accept')}
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="mt-3">
        <div className="flex flex-col gap-4 justify-center">
          <div className="grid grid-cols-8 justify-between items-center py-2 mb-4 border-b-2">
            <div className="col-span-1 w-full">
              <img src={getLogoUrl()} className="w-10 sm:w-[4rem]" />
            </div>

            <span className="col-span-4 flex justify-end sm:justify-center sm:col-span-4 text-[0.5rem] font-extrabold text-center uppercase sm:text-2xl text-normal font-beVietNam">
              {t('productRequisition.confirmProductRequisitions')}
            </span>
            <div className="flex col-span-3 justify-end sm:col-span-1">
              <div className="flex flex-col justify-end text-[0.25rem] sm:text-sm font-beVietNam">
                <div className="flex flex-row gap-1 sm:p-1">
                  <span>KMH:</span>
                  <span>QR3-01/001</span>
                </div>
                <div className="flex flex-row gap-1 sm:p-1">
                  <span>Lần ban hành:</span>
                  <span>1</span>
                </div>
              </div>
            </div>
          </div>
          {data?.result && (
            <div className="grid grid-cols-1 gap-3 mb-4 text-sm sm:grid-cols-3 font-beVietNam">
              <div>
                <strong>Mức ưu tiên: </strong>
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
                {data?.result?.creator.fullname}
              </div>
              <div>
                <strong>Công trình sử dụng: </strong>
                {data?.result?.creator.userDepartments[0].department.site.name}
              </div>
              <div>
                <strong>Dự án: </strong>
                {data?.result?.project.name}
              </div>
              <div>
                <strong>Ghi chú: </strong>
                {data?.result?.description}
              </div>
            </div>
          )}
        </div>
        <DataTable
          isLoading={false}
          columns={columns}
          data={
            data?.result?.requestProducts?.map((item) => ({
              ...item,
              product: item.product || item.temporaryProduct || ({} as IProductInfo)
            })) || []
          }
          pages={1}
          onPageChange={() => {}}
          onPageSizeChange={() => {}}
        />

        <span className="text-lg font-semibold font-beVietNam">
          {t('productRequisition.approvalHistory')}
        </span>

        <DataTable
          isLoading={false}
          columns={columnsApprovalLog}
          data={sortedUserApprovals}
          pages={1}
          onPageChange={() => {}}
          onPageSizeChange={() => {}}
        />

        <DialogApprovalRequisition
          openDialog={openDialog as ApprovalAction}
          setOpenDialog={setOpenDialog}
          onConfirm={handleConfirm}
          status={data?.result?.status as RequisitionStatus}
          isRecalled={data?.result?.isRecalled}
          // roleApproval={roleApproval as ProductRequisitionRoleApproval}
        />
      </div>
    </div>
  )
}

export default ApprovalProductRequisitionDetail
