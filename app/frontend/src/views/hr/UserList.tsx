import React, { useEffect, useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui'
import { columns } from './DataTable/columns'
import SpinnerLoading from '@/components/app/spinner/SpinnerLoading'
import { IUserInfo } from '@/types/user.type'

const Projects: React.FC = () => {
  const [data, setData] = useState<IUserInfo[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  async function getData(): Promise<IUserInfo[]> {
    return [
      {
        id: '728ed52f',
        avatar: 'SN',
        fullName: 'Lê Thành Nghĩa',
        email: 'thanhnghia1991@gmail.com',
        role: 'Admin',
        dob: '1991-05-25',
        phoneNumber: '1234567890',
        department: 'IT',
        site: 'Văn phòng',
        address: 'New York, USA'
      }
    ]
  }

  useEffect(() => {
    getData().then((data) => {
      setData(data)
      setLoading(false)
    })
  }, [])

  return (
    <div
      className="relative flex items-start flex-1 rounded-lg shadow-none"
      x-chunk="dashboard-02-chunk-1"
    >
      {loading && <SpinnerLoading />}
      <div className="grid items-start w-full gap-6 mx-auto">
        <div className="grid w-full gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between w-full p-6 border-b">
              <div className="flex flex-col items-start gap-2 py-2">
                <CardTitle>Danh sách nhân viên</CardTitle>
                <CardDescription>Quản lý thông tin chi tiết của tất cả nhân viên</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col mt-6">
              <DataTable columns={columns} data={data} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Projects
