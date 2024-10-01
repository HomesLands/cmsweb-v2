import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  VisibilityState,
  useReactTable,
  Column,
  Table as ReactTable,
  PaginationState
} from '@tanstack/react-table'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Loader2Icon
} from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui'
import { cn } from '@/lib/utils'

// DataTable Component
interface DataTableProps<TData, TValue> {
  isLoading: boolean
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pages: number
  page: number
  pageSize: number
  onPageChange: (pageIndex: number) => void
  onPageSizeChange?: (pageSize: number) => void
  onRowClick?: (row: TData) => void
  CustomComponent?: React.ElementType<{ table: ReactTable<TData> }>
}

import {
  IRequisitionFormResponseForApprover,
  RequestRequisitionRoleApproval,
  RequestRequisitionStatus
} from '@/types'
import { FilterRequisitionStatus, RequisitionStatus, UserApprovalStage } from '@/constants'

export function DataTable<TData, TValue>({
  isLoading,
  columns,
  data,
  pages,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  CustomComponent,
  onRowClick
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation('tableData')

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [filterValue, setFilterValue] = useState<string>('all')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize
  })
  const [availableRoleApprovals, setAvailableRoleApprovals] = useState<string[]>([])

  useEffect(() => {
    // Extract unique roleApproval values from the data
    const roleApprovals = data.map(
      (item: TData) => (item as IRequisitionFormResponseForApprover).roleApproval
    )
    setAvailableRoleApprovals(roleApprovals)
  }, [data])

  const table = useReactTable({
    data,
    columns,
    pageCount: pages,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    debugTable: true
  })

  const handleFilterChange = (value: string) => {
    setFilterValue(value)

    let filterConditions: ColumnFiltersState = []

    const applyFilter = (
      roleApproval: RequestRequisitionRoleApproval,
      status: RequestRequisitionStatus,
      isRecalled: boolean
    ) => {
      filterConditions = [
        { id: 'roleApproval', value: roleApproval },
        { id: 'status', value: status },
        { id: 'isRecalled', value: isRecalled }
      ]
    }

    switch (value) {
      // Approval Stage 1
      case FilterRequisitionStatus.WAITING_APPROVAL_1:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_1, RequisitionStatus.WAITING, false)
        break
      case FilterRequisitionStatus.APPROVED_STAGE_1:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_1, RequisitionStatus.ACCEPTED_STAGE_1, false)
        break
      case FilterRequisitionStatus.CANCELED_STAGE_1:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_1, RequisitionStatus.CANCEL, true)
        break

      // Approval Stage 2
      case FilterRequisitionStatus.WAITING_APPROVAL_2:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_2, RequisitionStatus.ACCEPTED_STAGE_1, false)
        break
      case FilterRequisitionStatus.APPROVED_STAGE_2:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_2, RequisitionStatus.ACCEPTED_STAGE_2, false)
        break
      case FilterRequisitionStatus.RETURNED_STAGE_2:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_2, RequisitionStatus.WAITING, true)
        break
      case FilterRequisitionStatus.CANCELED_STAGE_2:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_2, RequisitionStatus.CANCEL, true)
        break

      // Approval Stage 3
      case FilterRequisitionStatus.WAITING_APPROVAL_3:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_3, RequisitionStatus.ACCEPTED_STAGE_2, false)
        break
      case FilterRequisitionStatus.APPROVED_STAGE_3:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_3, RequisitionStatus.WAITING_EXPORT, false)
        break
      case FilterRequisitionStatus.RETURNED_STAGE_3:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_3, RequisitionStatus.ACCEPTED_STAGE_1, true)
        break
      case FilterRequisitionStatus.CANCELED_STAGE_3:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_3, RequisitionStatus.CANCEL, true)
        break

      default:
        filterConditions = []
    }

    setColumnFilters(filterConditions)
  }

  return (
    <div>
      <div className="flex justify-between gap-2">
        {CustomComponent && <CustomComponent table={table} />}
        <Select value={filterValue} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[12rem]">
            <SelectValue placeholder={t('tablePaging.filter')} />
          </SelectTrigger>

          <SelectContent side="top">
            <SelectItem value="all">{t('tableData.all')}</SelectItem>

            {availableRoleApprovals.includes(UserApprovalStage.APPROVAL_STAGE_1) && (
              <>
                <SelectItem value="waiting_approval_1">
                  {t('tableData.waiting_approval_1')}
                </SelectItem>
                <SelectItem value="approved_stage_1">{t('tableData.approved_stage_1')}</SelectItem>
                <SelectItem value="canceled_stage_1">{t('tableData.canceled_stage_1')}</SelectItem>
              </>
            )}

            {availableRoleApprovals.includes(UserApprovalStage.APPROVAL_STAGE_2) && (
              <>
                <SelectItem value={FilterRequisitionStatus.WAITING_APPROVAL_2}>
                  {t('tableData.waiting_approval_2')}
                </SelectItem>
                <SelectItem value={FilterRequisitionStatus.APPROVED_STAGE_2}>
                  {t('tableData.approved_stage_2')}
                </SelectItem>
                <SelectItem value={FilterRequisitionStatus.RETURNED_STAGE_2}>
                  {t('tableData.returned_stage_2')}
                </SelectItem>
                <SelectItem value={FilterRequisitionStatus.CANCELED_STAGE_2}>
                  {t('tableData.canceled_stage_2')}
                </SelectItem>
              </>
            )}

            {availableRoleApprovals.includes(UserApprovalStage.APPROVAL_STAGE_3) && (
              <>
                <SelectItem value={FilterRequisitionStatus.WAITING_APPROVAL_3}>
                  {t('tableData.waiting_approval_3')}
                </SelectItem>
                <SelectItem value={FilterRequisitionStatus.APPROVED_STAGE_3}>
                  {t('tableData.approved_stage_3')}
                </SelectItem>
                <SelectItem value={FilterRequisitionStatus.RETURNED_STAGE_3}>
                  {t('tableData.returned_stage_3')}
                </SelectItem>
                <SelectItem value={FilterRequisitionStatus.CANCELED_STAGE_3}>
                  {t('tableData.canceled_stage_3')}
                </SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-3 border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="w-full h-full mx-auto text-center">
                  <Loader2Icon className="w-6 h-6 mx-auto text-primary animate-spin" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? t('tablePaging.selected') : undefined}
                  className="relative cursor-pointer hover:bg-muted/50"
                  onClick={() => onRowClick && onRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-full text-center">
                  {t('tablePaging.noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex-1 mt-2 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} {t('tablePaging.select')}
        {table.getFilteredRowModel().rows.length} {t('tablePaging.rows')}
      </div> */}
      <div className="flex items-center justify-end py-4 space-x-2">
        <DataTablePagination
          table={table}
          pages={pages}
          page={pagination.pageIndex + 1}
          pageSize={pagination.pageSize}
          onPageChange={(pageIndex) => {
            setPagination((prev) => ({ ...prev, pageIndex: pageIndex - 1 }))
            onPageChange(pageIndex)
          }}
          onPageSizeChange={(pageSize) => {
            setPagination((prev) => ({ ...prev, pageSize }))
            if (onPageSizeChange) {
              onPageSizeChange(pageSize)
            }
          }}
        />
      </div>
    </div>
  )
}

export function DataTableByCreator<TData, TValue>({
  isLoading,
  columns,
  data,
  pages,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  CustomComponent
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation('tableData')

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [filterValue, setFilterValue] = useState<string>('all')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize
  })

  const table = useReactTable({
    data,
    columns,
    pageCount: pages,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    debugTable: true
  })

  const handleFilterChange = (value: string) => {
    setFilterValue(value)

    let filterConditions: ColumnFiltersState = []

    switch (value) {
      case 'waiting_approval_1':
        filterConditions = [
          { id: 'status', value: 'waiting' },
          { id: 'isRecalled', value: false }
        ]
        break
      case 'approved_stage_1':
        filterConditions = [
          { id: 'status', value: 'accepted_stage_1' },
          { id: 'isRecalled', value: false }
        ]
        break
      case 'approved_stage_2':
        filterConditions = [
          { id: 'status', value: 'accepted_stage_2' },
          { id: 'isRecalled', value: false }
        ]
        break
      case 'approved_stage_3':
        filterConditions = [
          { id: 'status', value: 'waiting_export' },
          { id: 'isRecalled', value: false }
        ]
        break
      case 'returned_stage_3':
        filterConditions = [
          { id: 'status', value: 'accepted_stage_1' },
          { id: 'isRecalled', value: true }
        ]
        break
      case 'canceled':
        filterConditions = [
          { id: 'status', value: 'cancel' },
          { id: 'isRecalled', value: true }
        ]
        break
      default:
        filterConditions = []
    }

    setColumnFilters(filterConditions)
  }

  return (
    <div>
      <div className="flex justify-between gap-2">
        {CustomComponent && <CustomComponent table={table} />}
        <Select value={filterValue} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[12rem]">
            <SelectValue placeholder={t('tablePaging.filter')} />
          </SelectTrigger>

          <SelectContent side="top">
            <SelectItem value="all">{t('tableData.all')}</SelectItem>
            <SelectItem value="waiting_approval_1">{t('tableData.waiting_approval_1')}</SelectItem>
            <SelectItem value="approved_stage_1">{t('tableData.approved_stage_1')}</SelectItem>
            <SelectItem value="approved_stage_2">{t('tableData.approved_stage_2')}</SelectItem>
            <SelectItem value="approved_stage_3">{t('tableData.approved_stage_3')}</SelectItem>
            <SelectItem value="returned_stage_3">{t('tableData.returned_stage_3')}</SelectItem>
            <SelectItem value="canceled">{t('tableData.canceled')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-3 border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="w-full h-full mx-auto text-center">
                  <Loader2Icon className="w-6 h-6 mx-auto text-primary animate-spin" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? t('tablePaging.selected') : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-full text-center">
                  {t('tablePaging.noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex-1 mt-2 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} {t('tablePaging.select')}
        {table.getFilteredRowModel().rows.length} {t('tablePaging.rows')}
      </div> */}
      <div className="flex items-center justify-end py-4 space-x-2">
        <DataTablePagination
          table={table}
          pages={pages}
          page={pagination.pageIndex + 1}
          pageSize={pagination.pageSize}
          onPageChange={(pageIndex) => {
            setPagination((prev) => ({ ...prev, pageIndex: pageIndex - 1 }))
            onPageChange(pageIndex)
          }}
          onPageSizeChange={(pageSize) => {
            setPagination((prev) => ({ ...prev, pageSize }))
            if (onPageSizeChange) {
              onPageSizeChange(pageSize)
            }
          }}
        />
      </div>
    </div>
  )
}

// DataTableRequisition Component
export function DataTableRequisition<TData, TValue>({
  isLoading,
  columns,
  data,
  pages,
  page,
  pageSize,
  CustomComponent
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation('tableData')

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize
  })

  const table = useReactTable({
    data,
    columns,
    pageCount: pages,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    debugTable: true
  })

  return (
    <div>
      <div className="flex justify-between gap-2">
        {CustomComponent && <CustomComponent table={table} />}
      </div>
      <div className="mt-3 border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="w-full h-full mx-auto text-center">
                  <Loader2Icon className="w-6 h-6 mx-auto text-primary animate-spin" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-full text-center">
                  {t('tablePaging.noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// DataTableColumnHeader Component
interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { t } = useTranslation('tableData')

  if (!column.getCanSort()) {
    return <div className="text-[0.8rem]">{title}</div>
  }

  return (
    <div className={cn('flex items-center min-w-[7.8rem] space-x-2 text-[0.8rem]', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span className="text-[0.8rem]">{t(title)}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="w-3 h-3 ml-2" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="w-3 h-3 ml-2" />
            ) : (
              <ArrowDownIcon className="w-3 h-3 ml-2" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            {t('tablePaging.asc')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            {t('tablePaging.desc')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <ArrowUpIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            {t('tablePaging.hide')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function DataTableColumnAddressHeader<TData, TValue>({
  column,
  title,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { t } = useTranslation('tableData')
  if (!column.getCanSort()) {
    return <div className="text-[0.8rem]">{title}</div>
  }

  return (
    <div className={cn('flex items-center min-w-[12rem] space-x-2 text-[0.8rem]', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span className="text-[0.8rem]">{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="w-3 h-3 ml-2" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="w-3 h-3 ml-2" />
            ) : (
              <ArrowDownIcon className="w-3 h-3 ml-2" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            {t('tablePaging.asc')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            {t('tablePaging.desc')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <ArrowUpIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            {t('tablePaging.hide')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function DataTableColumnActionHeader<TData, TValue>({
  column,
  title,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { t } = useTranslation('tableData')
  if (!column.getCanSort()) {
    return <div className="text-[0.8rem]">{title}</div>
  }

  return (
    <div className={cn('flex items-center justify-center space-x-2 text-[0.8rem]', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span className="text-[0.8rem]">{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="w-3 h-3 ml-2" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="w-3 h-3 ml-2" />
            ) : (
              <ArrowDownIcon className="w-3 h-3 ml-2" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            {t('tablePaging.asc')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            {t('tablePaging.desc')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <ArrowUpIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            {t('tablePaging.hide')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// DataTablePagination Component
interface PaginationProps<TData> {
  table: ReactTable<TData>
  // total: number
  pages: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

interface PaginationProps<TData> {
  table: ReactTable<TData>
  pages: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export function DataTablePagination<TData>({
  pages,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange
}: PaginationProps<TData>) {
  const { t } = useTranslation('tableData')

  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">{t('tablePaging.rowsPerPage')}</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => onPageSizeChange && onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={`${pageSize}`} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium">
        {t('tablePaging.page')} {page} {t('tablePaging.of')} {pages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="w-8 h-8 p-0"
          onClick={() => onPageChange(1)}
          disabled={page === 1}
        >
          <span className="sr-only">{t('tablePaging.firstPage')}</span>
          <ChevronsLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="w-8 h-8 p-0"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <span className="sr-only">{t('tablePaging.previousPage')}</span>
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="w-8 h-8 p-0"
          onClick={() => onPageChange(page + 1)}
          disabled={page === pages}
        >
          <span className="sr-only">{t('tablePaging.nextPage')}</span>
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="w-8 h-8 p-0"
          onClick={() => onPageChange(pages)}
          disabled={page === pages}
        >
          <span className="sr-only">{t('tablePaging.lastPage')}</span>
          <ChevronsRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
