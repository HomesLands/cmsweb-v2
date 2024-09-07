import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { DataTable } from '@/components/ui'
import { columns } from './DataTable/columns'
import { getUsers } from '@/api/users'
import NProgress from 'nprogress'

const Employees: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', { page: 1, pageSize: 10 }],
    queryFn: () => {
      console.log('Querying users...')
      return getUsers({ page: 1, pageSize: 10 })
    }
  })

  if (isLoading) {
    NProgress.start()
  } else {
    NProgress.done()
  }

  return (
    <div className="w-full gap-6">
      {data && data.items ? (
        <DataTable columns={columns} data={data.items} />
      ) : (
        <div className="flex items-center justify-center">
          {error && <div className="text-red-500">Không có dữ liệu</div>}
        </div>
      )}
    </div>
  )
}

export default Employees
