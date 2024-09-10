import { z } from 'zod'

import { DataTable } from '@/components/ui'
import { productSearchSchema } from '@/schemas'
import { useProductList } from '@/hooks'
import usePaging from '@/hooks/use-paging'

// import { columns } from '@/views/products/DataTable/columns'
import { CustomComponentRequest } from '@/views/products/CustomComponentRequest'
import { columnsSearch } from '@/views/products/DataTable/columnsSearch'

interface IFormCreateProductProps {
  onSubmit: (data: z.infer<typeof productSearchSchema>) => void
}

export const FormSearchProduct: React.FC<IFormCreateProductProps> = () => {
  const { pagination, handlePageChange, handlePageSizeChange } = usePaging()

  const { data } = useProductList({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  })

  return (
    <div className="w-full mt-3">
      <DataTable
        columns={columnsSearch}
        data={data?.items || []}
        total={data?.total || 0}
        pages={data?.pages || 0}
        page={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        CustomComponent={CustomComponentRequest}
      />
    </div>
  )
}
