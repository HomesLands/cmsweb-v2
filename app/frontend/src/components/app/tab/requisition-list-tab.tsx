import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import RequisitionStage1Table from '../table/requisition-stage-1-table'

export function RequisitionsTab() {
  return (
    <Tabs defaultValue="not-approved" className="w-full">
      <TabsList className="flex justify-end gap-2 space-x-2">
        {/* Chia tab trigger thành 4 phần và dồn về cạnh phải */}
        <TabsTrigger value="not-approved" className="w-fit">
          Chưa duyệt
        </TabsTrigger>
        <TabsTrigger value="waiting-approval" className="w-fit">
          Đang xét duyệt
        </TabsTrigger>
        <TabsTrigger value="approved" className="w-fit">
          Đã duyệt
        </TabsTrigger>
        <TabsTrigger value="rejected" className="w-fit">
          Từ chối
        </TabsTrigger>
      </TabsList>
      <TabsContent value="not-approved" className="w-full">
        {/* Tab content chiếm full width */}
        <Card className="w-full border-none">
          <CardHeader>
            <CardTitle>Đang xét duyệt</CardTitle>
            <CardDescription>Danh sách các yêu cầu đang xét duyệt</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <RequisitionStage1Table />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="waiting-approval" className="w-full">
        {/* Tab content chiếm full width */}
        <Card className="w-full border-none">
          <CardHeader>
            <CardTitle>Đang xét duyệt</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RequisitionStage1Table />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="approved" className="w-full">
        {/* Tab content chiếm full width */}
        <Card className="w-full border-none">
          <CardHeader>
            <CardTitle>Đã duyệt</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <RequisitionStage1Table />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="rejected" className="w-full">
        {/* Tab content chiếm full width */}
        <Card className="w-full border-none">
          <CardHeader>
            <CardTitle>Từ chối</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RequisitionStage1Table />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
