import React, { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollArea,
  ScrollBar
} from '@/components/ui'
import { DataTable } from '@/components/ui'
import { columns } from './DataTable/columns'
import SpinnerLoading from '@/components/app/spinner/SpinnerLoading'
import { MaterialInfo } from '@/types/material.type'
import { useLayoutStore } from '@/stores'

const Projects: React.FC = () => {
  const { isMinimized } = useLayoutStore()
  const [data, setData] = useState<MaterialInfo[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  async function getData(): Promise<[MaterialInfo]> {
    return [
      {
        id: '728ed52f',
        createdBy: 'Lê Thành Nghĩa',
        createdAt: new Date(),
        updatedAt: new Date(),
        commanderApprovalStatus: 'Đã duyệt',
        commanderApprovalContent: 'Hợp lệ',
        projectManagerApprovalStatus: 'Đã duyệt',
        projectManagerApprovalContent: 'Hợp lệ',
        directorApprovalStatus: 'Đã duyệt',
        directorApprovalContent: 'Hợp lệ',
        notes: 'Cần gấp'
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
    <div className="flex items-start shadow-none flex-1rounded-lg" x-chunk="dashboard-02-chunk-1">
      <div className="grid items-start w-full mx-auto">
        <div className="grid w-full">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between w-full px-4 py-6 border-b">
              <div className="flex flex-col items-start gap-2 py-2">
                <CardTitle>Yêu cầu vật tư</CardTitle>
                <CardDescription>Quản lý thông tin chi tiết yêu cầu vật tư</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col px-2 mt-4">
              {loading ? (
                <SpinnerLoading />
              ) : (
                <ScrollArea className={`whitespace-nowrap ${isMinimized ? 'w-11/12' : 'w-5/6'}`}>
                  <DataTable columns={columns} data={data} />
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Projects
