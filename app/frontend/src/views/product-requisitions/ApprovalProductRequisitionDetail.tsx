import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { ReaderIcon } from '@radix-ui/react-icons'
import { useNavigate, useParams } from 'react-router-dom'

import { Label, Button, DataTable } from '@/components/ui'
import { useApproveProductRequisition, useRequisitionByUserApproval } from '@/hooks'

import { useColumnsDetail, useColumnsApprovalLog } from './data-table'
import { ApprovalLogStatus, IProductInfo, ProductRequisitionRoleApproval } from '@/types'
import { DialogApprovalRequisition } from '@/components/app/dialog'
import { showToast } from '@/utils'
import { ApprovalAction, baseURL, RequisitionStatus, UserApprovalStage } from '@/constants'

const ApprovalProductRequisitionDetail: React.FC = () => {
  const navigate = useNavigate()
  const { t: tToast } = useTranslation('toast')
  const { t } = useTranslation(['productRequisition'])
  const { slug } = useParams<{ slug: string }>()
  const { data, refetch } = useRequisitionByUserApproval(slug!)
  const { mutate: approveProductRequisition } = useApproveProductRequisition()

  const { roleApproval } = data?.result || {}

  const columns = useColumnsDetail()
  const columnsApprovalLog = useColumnsApprovalLog()
  const [openDialog, setOpenDialog] = useState<'accept' | 'give_back' | 'cancel' | null>(null)

  const queryClient = useQueryClient()

  const buttonStates = useMemo(() => {
    if (!data?.result)
      return {
        acceptEnabled: false,
        giveBackEnabled: false,
        cancelEnabled: false,
        showButtons: false,
        roleApproval: undefined,
        statusDisplay: ''
      }

    const { productRequisitionForm, roleApproval } = data.result
    const { status, isRecalled } = productRequisitionForm

    let acceptEnabled = false
    let giveBackEnabled = false
    let cancelEnabled = false
    let showButtons = true
    let statusDisplay = ''

    switch (roleApproval) {
      case UserApprovalStage.APPROVAL_STAGE_1:
        if (status === RequisitionStatus.WAITING && !isRecalled) {
          acceptEnabled = true
          cancelEnabled = true
          statusDisplay = 'Chờ duyệt'
        } else if (status === RequisitionStatus.WAITING && isRecalled) {
          acceptEnabled = true
          cancelEnabled = true
          statusDisplay = 'Chờ duyệt'
        } else if (status === RequisitionStatus.CANCEL && isRecalled) {
          showButtons = false
          statusDisplay = 'Đã hủy'
        } else if (status === RequisitionStatus.ACCEPTED_STAGE_1 && !isRecalled) {
          showButtons = false
          statusDisplay = 'Đã duyệt'
        }
        break

      case UserApprovalStage.APPROVAL_STAGE_2:
        if (status === RequisitionStatus.ACCEPTED_STAGE_1 && !isRecalled) {
          acceptEnabled = true
          giveBackEnabled = true
          cancelEnabled = true
          statusDisplay = 'Chờ duyệt bước 2'
        } else if (status === RequisitionStatus.ACCEPTED_STAGE_1 && isRecalled) {
          acceptEnabled = true
          giveBackEnabled = true
          cancelEnabled = true
          statusDisplay = 'Chờ duyệt bước 2 (hoàn lại từ bước trên)'
        } else if (status === RequisitionStatus.ACCEPTED_STAGE_2) {
          showButtons = false
          statusDisplay = 'Đã duyệt'
        } else if (status === RequisitionStatus.CANCEL && isRecalled) {
          showButtons = false
          statusDisplay = 'Hủy'
        } else if (status === RequisitionStatus.WAITING && isRecalled) {
          showButtons = false
          statusDisplay = 'Bị hoàn lại để xem xét'
        }
        break

      case UserApprovalStage.APPROVAL_STAGE_3:
        if (status === RequisitionStatus.ACCEPTED_STAGE_2 && !isRecalled) {
          acceptEnabled = true
          giveBackEnabled = true
          cancelEnabled = true
          statusDisplay = 'Chờ duyệt bước 3'
        } else if (status === RequisitionStatus.ACCEPTED_STAGE_1 && isRecalled) {
          showButtons = false
          statusDisplay = 'Đã bị hoàn để xem xét lại'
        } else if (status === RequisitionStatus.WAITING_EXPORT) {
          showButtons = false
          statusDisplay = 'Đã duyệt'
        } else if (status === RequisitionStatus.CANCEL && isRecalled) {
          showButtons = false
          statusDisplay = 'Hủy'
        }
        break
    }

    return {
      acceptEnabled,
      giveBackEnabled,
      cancelEnabled,
      showButtons,
      roleApproval,
      statusDisplay
    }
  }, [data?.result])

  const userApprovals = useMemo(() => {
    return Array.isArray(data?.result?.productRequisitionForm.userApprovals)
      ? data.result.productRequisitionForm.userApprovals
      : []
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

  const handleConfirm = (message: string, status: ApprovalLogStatus) => {
    approveProductRequisition(
      {
        formSlug: data?.result.productRequisitionForm.slug as string,
        approvalLog: {
          status: status,
          content: message
        }
      },
      {
        onSuccess: () => {
          setOpenDialog(null)

          // Display toast based on the action type
          switch (status) {
            case 'accept':
              showToast(tToast('toast.approveRequestSuccess'))
              break
            case 'give_back':
              showToast(tToast('toast.giveBackRequestSuccess'))
              break
            case 'cancel':
              showToast(tToast('toast.cancelRequestSuccess'))
              break
            default:
              showToast(tToast('toast.requestActionSuccess'))
          }

          refetch()
          queryClient.invalidateQueries({ queryKey: ['productRequisitionByApprover'] })
        }
      }
    )
  }

  const getLogoUrl = () => {
    if (
      data?.result?.productRequisitionForm.creator?.userDepartments[0]?.department?.site?.company
        ?.logo
    )
      return `${baseURL}/files/${data?.result?.productRequisitionForm.creator.userDepartments[0].department.site.company.logo}`
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
              {buttonStates.cancelEnabled && (
                <Button variant="destructive" onClick={handleCancel} className="w-full sm:w-auto">
                  {t('productRequisition.cancel')}
                </Button>
              )}
              {buttonStates.giveBackEnabled && (
                <Button variant="outline" onClick={handleGiveBack} className="w-full sm:w-auto">
                  {t('productRequisition.giveBack')}
                </Button>
              )}
              {buttonStates.acceptEnabled && (
                <Button variant="default" onClick={handleAccept} className="w-full sm:w-auto">
                  {t('productRequisition.accept')}
                </Button>
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
                <span
                  className={
                    data?.result?.productRequisitionForm.type === 'urgent'
                      ? 'text-red-600 font-bold'
                      : ''
                  }
                >
                  {data?.result?.productRequisitionForm.type === 'normal'
                    ? 'Bình thường'
                    : 'Cần gấp'}
                </span>
              </div>
              <div>
                <strong>Mã phiếu yêu cầu: </strong>
                {data?.result?.productRequisitionForm.code}
              </div>
              <div>
                <strong>Người yêu cầu: </strong>
                {data?.result?.productRequisitionForm.creator.fullname}
              </div>
              <div>
                <strong>Công trình sử dụng: </strong>
                {
                  data?.result?.productRequisitionForm.creator.userDepartments[0].department.site
                    .name
                }
              </div>
              <div>
                <strong>Dự án: </strong>
                {data?.result?.productRequisitionForm.project.name}
              </div>
              <div>
                <strong>Ghi chú: </strong>
                {data?.result?.productRequisitionForm.description}
              </div>
              <div>
                <strong>Trạng thái: </strong>
                <span className={getStatusColor(buttonStates.statusDisplay)}>
                  {buttonStates.statusDisplay}
                </span>
              </div>
            </div>
          )}
        </div>
        <DataTable
          isLoading={false}
          columns={columns}
          data={
            data?.result?.productRequisitionForm.requestProducts?.map((item) => ({
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
          roleApproval={roleApproval as ProductRequisitionRoleApproval}
        />
      </div>
    </div>
  )
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Chờ duyệt':
    case 'Chờ duyệt bước 2':
    case 'Chờ duyệt bước 3':
      return 'text-yellow-600 font-bold'
    case 'Đã duyệt':
      return 'text-green-600 font-bold'
    case 'Đã hủy':
    case 'Hủy':
    case 'Đã bị hoàn để xem xét lại':
    case 'Bị hoàn lại để xem xét':
      return 'text-red-600 font-bold'
    default:
      return ''
  }
}

export default ApprovalProductRequisitionDetail
