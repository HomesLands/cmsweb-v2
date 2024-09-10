import React from 'react'

import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
// import { columns } from '../employees/DataTable/columns'
import { columns } from './DataTable/columns'
import { useUsers, useProducts } from '@/hooks'
import { CustomComponent } from './CustomComponent'
import usePaging from '@/hooks/use-paging'

const ProductList: React.FC = () => {
  const { pagination, handlePageChange, handlePageSizeChange } = usePaging()

  const { data } = useProducts({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  })

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        Danh sách yêu cầu vật tư
      </Label>
      <DataTable
        columns={columns}
        data={data?.items || []}
        total={data?.total || 0}
        pages={data?.pages || 0}
        page={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        CustomComponent={CustomComponent}
      />
    </div>
  )
}

export default ProductList
