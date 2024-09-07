import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
// import { columns } from './DataTable/columns'
// import { IProductInfo } from '@/types'

const Warehouse: React.FC = () => {
  // const [data, setData] = useState<IProductInfo[]>([])
  // async function getData(): Promise<IProductInfo[]> {
  //   return [
  //     {
  //       id: '728ed52f',
  //       createdBy: 'Lê Thành Nghĩa',
  //       productCode: '123456',
  //       productName: 'Máy in',
  //       modelOrSerialNumber: '123456',
  //       supplier: 'HP',
  //       // importDate: new Date().toISOString(), // Save as ISO string
  //       unit: 'Cái',
  //       quantity: 10,
  //       address: 'HCM',
  //       note: 'Ghi chú',
  //       createdAt: new Date()
  //     }
  //   ]
  // }

  // useEffect(() => {
  //   getData().then((data) => {
  //     setData(data)
  //   })
  // }, [])

  return (
    <div
      className="relative flex items-start flex-1 rounded-lg shadow-none"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="grid items-start w-full gap-4 mx-auto">
        <div className="grid w-full gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between w-full border-b">
              <div className="flex flex-col items-start gap-2">
                <CardTitle>Danh sách vật tư</CardTitle>
                <CardDescription>Quản lý thông tin chi tiết vật tư</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              {/* <DataTableWarehouse columns={columns} data={data} /> */}
              {/* <FormCreateProduct /> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Warehouse
