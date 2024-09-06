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
    <div
      className="relative flex items-start flex-1 rounded-lg shadow-none"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="grid items-start w-full gap-6 mx-auto">
        <div className="grid w-full gap-6">
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between w-full p-6 border-b">
              <div className="flex flex-col items-start gap-2 py-2">
                <CardTitle>Danh sách nhân viên</CardTitle>
                <CardDescription>Quản lý thông tin chi tiết của tất cả nhân viên</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col mt-6">
              {data && data.items ? (
                <DataTable columns={columns} data={data.items} />
              ) : (
                <div className="flex items-center justify-center w-full h-64">
                  {error && <div className="text-red-500">Không có dữ liệu</div>}
                </div>
              )}
            </CardContent>
          </Card> */}
          {data && data.items ? (
            <DataTable columns={columns} data={data.items} />
          ) : (
            <div className="flex items-center justify-center">
              {error && <div className="text-red-500">Không có dữ liệu</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Employees
