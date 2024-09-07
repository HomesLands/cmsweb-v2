import { getProducts } from '@/api/products'
import { RequestStatusBadge } from '@/components/app/badge/RequestStatusBadge'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DataTableColumnHeader,
  Checkbox,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui'
import { IProductApprovalInfo } from '@/types'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'
import {
  ChevronDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreHorizontal
} from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Projects: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const dataQuery = useQuery({
    queryKey: ['projects', pagination],
    queryFn: () => getProducts({ page: pagination.pageIndex + 1, pageSize: pagination.pageSize }),
    placeholderData: keepPreviousData
  })

  const columns: ColumnDef<IProductApprovalInfo>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'createdBy',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Người tạo" />
    },
    {
      accessorKey: 'commanderApprovalStatus',
      header: ({ column }) => <DataTableColumnHeader column={column} title="CHT" />,
      cell: ({ row }) => {
        return <RequestStatusBadge status={row.original.commanderApprovalStatus} />
      }
    },
    {
      accessorKey: 'commanderApprovalContent',
      header: 'Nội dung'
    },
    {
      accessorKey: 'projectManagerApprovalStatus',
      header: ({ column }) => <DataTableColumnHeader column={column} title="TPDA" />,
      cell: ({ row }) => {
        return <RequestStatusBadge status={row.original.projectManagerApprovalStatus} />
      }
    },
    {
      accessorKey: 'projectManagerApprovalContent',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nội dung" />
    },
    {
      accessorKey: 'directorApprovalStatus',
      header: ({ column }) => <DataTableColumnHeader column={column} title="GD" />,
      cell: ({ row }) => {
        return <RequestStatusBadge status={row.original.directorApprovalStatus} />
      }
    },
    {
      accessorKey: 'directorApprovalContent',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nội dung" />
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const payment = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Actions</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cập nhật</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  const table = useReactTable({
    data: dataQuery.data?.items || [],
    columns,
    rowCount: dataQuery.data?.total,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true, // we’re doing manual "server-side" pagination
    debugTable: true
  })

  return (
    <div className="flex flex-col items-start justify-start flex-1 gap-2 p-4 border border-dashed rounded-lg shadow-sm">
      <div className="flex justify-end w-full gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto text-normal">
              Chọn cột
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <NavLink to="/warehouse/add">
          <Button variant="outline" className="text-normal">
            <PlusCircledIcon className="w-4 h-4 mr-2" />
            Thêm vật tư
          </Button>
        </NavLink>
      </div>
      <div className="w-full border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex-1 mt-2 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} trong{' '}
        {table.getFilteredRowModel().rows.length} hàng được chọn
      </div>
      <div className="flex items-center justify-end w-full mt-4">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2 ">
            <p className="text-sm font-medium">Hàng mỗi trang</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={`${table.getState().pagination.pageSize}`} />
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
            Trang {table.getState().pagination.pageIndex + 1} trên {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Trang đầu</span>
              <ChevronsLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Trang trước</span>
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Trang kế tiếp</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Trang cuối</span>
              <ChevronsRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
