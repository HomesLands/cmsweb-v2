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
  DropdownMenuSeparator,
  Input
} from '@/components/ui'
import { useState } from 'react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

// DataTable Component
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  total: number
  pages: number
  page: number
  pageSize: number
  onPageChange: (pageIndex: number) => void
  onPageSizeChange?: (pageSize: number) => void
  CustomComponent?: React.ElementType<{ table: ReactTable<TData> }>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  pages,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  CustomComponent
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
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
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex-1 mt-2 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} trong{' '}
        {table.getFilteredRowModel().rows.length} hàng được chọn
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <DataTablePagination
          table={table}
          total={total}
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
  if (!column.getCanSort()) {
    return <div className="text-[0.8rem]">{title}</div>
  }

  return (
    <div className={cn('flex items-center w-fit space-x-2 text-[0.8rem]', className)}>
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
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <ArrowUpIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            Hide
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
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <ArrowUpIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            Hide
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
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <ArrowUpIcon className="w-3 h-3 mr-2 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// DataTablePagination Component
interface PaginationProps<TData> {
  table: ReactTable<TData>
  total: number
  pages: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

interface PaginationProps<TData> {
  table: ReactTable<TData>
  total: number
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
  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Hàng mỗi trang</p>
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
        Trang {page} trên {pages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="w-8 h-8 p-0"
          onClick={() => onPageChange(1)}
          disabled={page === 1}
        >
          <span className="sr-only">Trang đầu</span>
          <ChevronsLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="w-8 h-8 p-0"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <span className="sr-only">Trang trước</span>
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="w-8 h-8 p-0"
          onClick={() => onPageChange(page + 1)}
          disabled={page === pages}
        >
          <span className="sr-only">Trang kế tiếp</span>
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="w-8 h-8 p-0"
          onClick={() => onPageChange(pages)}
          disabled={page === pages}
        >
          <span className="sr-only">Trang cuối</span>
          <ChevronsRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
