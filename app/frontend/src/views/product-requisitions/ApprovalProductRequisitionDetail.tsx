import React, { useState, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { ReaderIcon } from '@radix-ui/react-icons'
import { useNavigate, useParams } from 'react-router-dom'

import { Label, Button, DataTable, RequisitionTimeline } from '@/components/ui'
import { useApproveProductRequisition, useRequisitionByUserApproval } from '@/hooks'

import { useColumnsDetail } from './data-table'
import { ApprovalLogStatus, IProductInfo, ProductRequisitionRoleApproval } from '@/types'
import { DialogApprovalRequisition, DialogDeleteProductRequisition } from '@/components/app/dialog'
import { showToast, hasRequiredPermissions } from '@/utils'
import {
  ApprovalAction,
  Authority,
  baseURL,
  RequisitionStatus,
  Resource,
  ROUTE,
  UserApprovalStage
} from '@/constants'

const ApprovalProductRequisitionDetail: React.FC = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { t: tToast } = useTranslation('toast')
  const { t } = useTranslation(['productRequisition'])
  const { slug } = useParams<{ slug: string }>()
  const { data } = useRequisitionByUserApproval(slug!)
  const { mutate: approveProductRequisition } = useApproveProductRequisition()
  const { roleApproval } = data?.result || {}

  const columns = useColumnsDetail()
  const [openDialog, setOpenDialog] = useState<'accept' | 'give_back' | 'cancel' | null>(null)

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
          statusDisplay = t('productRequisition.waiting')
        } else if (status === RequisitionStatus.WAITING && isRecalled) {
          acceptEnabled = true
          cancelEnabled = true
          statusDisplay = t('productRequisition.waiting')
        } else if (status === RequisitionStatus.CANCEL && isRecalled) {
          showButtons = false
          statusDisplay = t('productRequisition.rejected')
        } else if (status === RequisitionStatus.ACCEPTED_STAGE_1 && !isRecalled) {
          showButtons = false
          statusDisplay = t('productRequisition.accepted')
        }
        break

      case UserApprovalStage.APPROVAL_STAGE_2:
        if (status === RequisitionStatus.ACCEPTED_STAGE_1 && !isRecalled) {
          acceptEnabled = true
          giveBackEnabled = true
          cancelEnabled = true
          statusDisplay = t('productRequisition.step2Waiting')
        } else if (status === RequisitionStatus.ACCEPTED_STAGE_1 && isRecalled) {
          acceptEnabled = true
          giveBackEnabled = true
          cancelEnabled = true
          statusDisplay = t('productRequisition.step2WaitingGiveback')
        } else if (status === RequisitionStatus.ACCEPTED_STAGE_2) {
          showButtons = false
          statusDisplay = t('productRequisition.accepted')
        } else if (status === RequisitionStatus.CANCEL && isRecalled) {
          showButtons = false
          statusDisplay = t('productRequisition.')
        } else if (status === RequisitionStatus.WAITING && isRecalled) {
          showButtons = false
          statusDisplay = t('productRequisition.giveback')
        }
        break

      case UserApprovalStage.APPROVAL_STAGE_3:
        if (status === RequisitionStatus.ACCEPTED_STAGE_2 && !isRecalled) {
          acceptEnabled = true
          giveBackEnabled = true
          cancelEnabled = true
          statusDisplay = t('productRequisition.step3Waiting')
        } else if (status === RequisitionStatus.ACCEPTED_STAGE_1 && isRecalled) {
          showButtons = false
          statusDisplay = t('productRequisition.giveback')
        } else if (status === RequisitionStatus.WAITING_EXPORT) {
          showButtons = false
          statusDisplay = t('productRequisition.accepted')
        } else if (status === RequisitionStatus.CANCEL && isRecalled) {
          showButtons = false
          statusDisplay = t('productRequisition.rejected')
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
  }, [data?.result, t])

  const userApprovals = useMemo(() => {
    return Array.isArray(data?.result?.productRequisitionForm.userApprovals)
      ? data.result.productRequisitionForm.userApprovals
      : []
  }, [data])

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
          queryClient.invalidateQueries({
            queryKey: ['requisitionByUserApproval']
          })

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

  const renderTimeline = () => {
    return userApprovals
      .flatMap((userApproval) =>
        userApproval.approvalLogs.map((log) => ({
          user: userApproval.assignedUserApproval.user.fullname,
          role: userApproval.assignedUserApproval.roleApproval,
          status: log.status,
          content: log.content,
          createdAt: new Date(log.createdAt).toISOString() // Format as a string
        }))
      )
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) // Sort by timestamp
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        <Label className="flex items-center gap-1 mb-2 font-semibold text-normal text-md font-beVietNam sm:mb-0">
          <ReaderIcon className="header-icon" />
          {t('requisitionDetail.requestDetail')}
        </Label>
        <div className="flex flex-row justify-end gap-2 sm:gap-4">
          <Button
            variant="outline"
            onClick={() => {
              navigate(`${ROUTE.APPROVAL_PRODUCT_REQUISITIONS}`)
            }}
            className="w-full sm:w-auto"
          >
            {t('productRequisition.back')}
          </Button>
          {hasRequiredPermissions({
            authority: Authority.DELETE,
            resource: Resource.PRODUCT_REQUISITION_FORM
          }) && <DialogDeleteProductRequisition requisition={data?.result || null} />}
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
        <div className="flex flex-col justify-center gap-4">
          <div className="grid items-center justify-between grid-cols-8 py-2 mb-4 border-b-2">
            <div className="w-full col-span-1">
              <img src={getLogoUrl()} className="w-12 sm:w-[6rem]" />
            </div>

            <span className="col-span-4 flex justify-end sm:justify-center sm:col-span-6 text-[0.5rem] font-extrabold text-center uppercase sm:text-2xl text-normal font-beVietNam">
              {t('productRequisition.confirmProductRequisitions')}
            </span>
            <div className="flex justify-end col-span-3 sm:col-span-1">
              <div className="flex flex-col justify-end text-[0.25rem] sm:text-sm font-beVietNam">
                <div className="flex flex-row gap-1 sm:p-1">
                  <span>KMH:</span>
                  <span>QR3-01/001</span>
                </div>
                <div className="flex flex-row gap-1 sm:p-1">
                  <span>{t('productRequisition.issuedDate')}</span>
                  <span>1</span>
                </div>
              </div>
            </div>
          </div>
          {data?.result && (
            <div className="grid grid-cols-1 gap-3 mb-4 text-sm sm:grid-cols-3 font-beVietNam">
              <div>
                <strong>{t('productRequisition.priority')}:</strong>{' '}
                <span
                  className={
                    data?.result?.productRequisitionForm.type === 'urgent'
                      ? 'text-red-600 font-bold'
                      : ''
                  }
                >
                  {data?.result?.productRequisitionForm.type === 'normal'
                    ? t('requestPriority.normal')
                    : t('requestPriority.urgent')}
                </span>
              </div>
              <div>
                <strong>{t('requisitionDetail.requestCode')}</strong>
                {data?.result?.productRequisitionForm.code}
              </div>
              <div>
                <strong>{t('requisitionDetail.requestCode')}</strong>
                {data?.result?.productRequisitionForm.creator.fullname}
              </div>
              <div>
                <strong>{t('requisitionDetail.siteName')}</strong>
                {
                  data?.result?.productRequisitionForm.creator.userDepartments[0].department.site
                    .name
                }
              </div>
              <div>
                <strong>{t('requisitionDetail.projectName')}</strong>
                {data?.result?.productRequisitionForm.projectName}
              </div>
              <div>
                <strong>{t('requisitionDetail.note')}</strong>
                {data?.result?.productRequisitionForm.description}
              </div>
              <div>
                <strong>{t('requisitionDetail.status')}</strong>
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

        <RequisitionTimeline items={renderTimeline()} />

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
    case i18next.t('status.waiting'):
    case i18next.t('status.waitingStep2'):
    case i18next.t('status.waitingStep3'):
      return 'text-yellow-600 font-bold'
    case i18next.t('status.approved'):
      return 'text-green-600 font-bold'
    case i18next.t('status.cancelled'):
    case i18next.t('status.cancel'):
    case i18next.t('status.recalledForReview'):
    case i18next.t('status.returnedForReview'):
      return 'text-red-600 font-bold'
    default:
      return ''
  }
}

export default ApprovalProductRequisitionDetail
