import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { Label, Button, DataTable } from '@/components/ui'
import { useProductRequisitionBySlug } from '@/hooks'

import { TbeLogo } from '@/assets/images'
import { MetekLogo } from '@/assets/images'
import { SongnamLogo } from '@/assets/images'
import { useColumnsDetail, useColumnsApprovalLog } from './data-table'
import {
  ApprovalLogStatus,
  IApproveProductRequisition,
  IRequisitionFormResponseForApprover,
  ProductRequisitionRoleApproval
} from '@/types'
import { DialogApprovalRequisition } from '@/components/app/dialog'
import { showToast } from '@/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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

  const { roleApproval } = selectedRequisition || {}

  const columns = useColumnsDetail()
  const columnsApprovalLog = useColumnsApprovalLog()
  const [openDialog, setOpenDialog] = useState<'accept' | 'give_back' | 'cancel' | null>(null)

  const buttonStates = useMemo(() => {
    if (!data?.result || !selectedRequisition) return {}

    const { status, isRecalled } = data.result
    const { roleApproval } = selectedRequisition

    let acceptEnabled = false
    let giveBackEnabled = false
    let cancelEnabled = false
    let showButtons = true

    switch (roleApproval) {
      case UserApprovalStage.APPROVAL_STAGE_1:
        if (status === RequisitionStatus.WAITING && !isRecalled) {
          acceptEnabled = true
          giveBackEnabled = true
        } else {
          showButtons = false
        }
        break
      case UserApprovalStage.APPROVAL_STAGE_2:
        if (status === RequisitionStatus.ACCEPTED_STAGE_1) {
          acceptEnabled = true
          giveBackEnabled = !isRecalled
          cancelEnabled = true
        } else {
          showButtons = false
        }
        break
      case UserApprovalStage.APPROVAL_STAGE_3:
        if (status === RequisitionStatus.ACCEPTED_STAGE_2) {
          acceptEnabled = true
          giveBackEnabled = !isRecalled
          cancelEnabled = true
        } else {
          showButtons = false
        }
        break
      default:
        showButtons = false
    }

    return { acceptEnabled, giveBackEnabled, cancelEnabled, showButtons }
  }, [data?.result, selectedRequisition])

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

      switch (roleApproval) {
        case UserApprovalStage.APPROVAL_STAGE_1:
          if (variables.approvalLog.status === ApprovalAction.ACCEPT) {
            toastMessage = tToast('toast.approveRequestSuccess')
          } else if (variables.approvalLog.status === ApprovalAction.GIVE_BACK) {
            toastMessage = tToast('toast.giveBackRequestSuccess')
          }
          break
        case UserApprovalStage.APPROVAL_STAGE_2:
        case UserApprovalStage.APPROVAL_STAGE_3:
          if (variables.approvalLog.status === ApprovalAction.ACCEPT) {
            toastMessage = tToast('toast.approveRequestSuccess')
          } else if (variables.approvalLog.status === ApprovalAction.GIVE_BACK) {
            toastMessage = tToast('toast.giveBackRequestSuccess')
          } else if (variables.approvalLog.status === ApprovalAction.CANCEL) {
            toastMessage = tToast('toast.cancelRequestSuccess')
          }
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Label className="flex gap-1 items-center font-semibold text-normal text-md font-beVietNam">
          <ReaderIcon className="header-icon" />
          {t('requisitionDetail.requestDetail')}
        </Label>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            {t('productRequisition.back')}
          </Button>
          {buttonStates.showButtons && (
            <>
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
              {(roleApproval === UserApprovalStage.APPROVAL_STAGE_2 ||
                roleApproval === UserApprovalStage.APPROVAL_STAGE_3) && (
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
            </>
          )}
        </div>
      </div>
      <div className="mt-3">
        <div className="flex flex-col gap-4 justify-center">
          <div className="grid grid-cols-6 justify-between items-center py-3 mb-4 border-b-2">
            {data?.result?.creator.userDepartments[0].department.site.company.name.includes(
              'Thái Bình'
            ) ? (
              <div className="col-span-1 w-full">
                <img src={TbeLogo} height={72} width={72} />
              </div>
            ) : data?.result?.creator.userDepartments[0].department.site.company.name.includes(
                'Mekong'
              ) ? (
              <div className="col-span-1 w-full">
                <img src={MetekLogo} height={150} width={150} />
              </div>
            ) : (
              <div className="col-span-1 w-full">
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
          data={data?.result?.requestProducts || []}
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

export default ApprovalProductRequisitionDetail
