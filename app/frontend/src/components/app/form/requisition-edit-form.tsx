// import { useForm } from 'react-hook-form'
// import { z } from 'zod'

// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
//   Input,
//   Form,
//   Textarea,
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
//   Button,
//   ScrollArea
// } from '@/components/ui'
// import { addNewProductRequestSchema } from '@/schemas'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { IProductRequisitionFormInfo } from '@/types'

// interface IFormRequisitionEditProps {
//   data?: IProductRequisitionFormInfo
// }

// export const RequisitionEditForm: React.FC<IFormRequisitionEditProps> = ({ data }) => {
//   console.log(data)
//   const form = useForm({
//     defaultValues: {
//       code: data?.code || '',
//       company: data?.creator.userDepartments[0].department.site.company.name || '',
//       createdAt: data?.createdAt || '',
//       creator: data?.creator || '',
//       // status: data?.status || '',
//       description: data?.description || '',
//       project: data?.project || '',
//       site: data?.creator.userDepartments[0].department.site.name || '',
//       type: data?.type || ''
//     }
//   })

//   return (
//     <div className="mt-3">
//       <Form {...form}>
//         <form className="space-y-6">
//           <div className="grid grid-cols-3 gap-2">
//             <FormField
//               control={form.control}
//               name="createdAt"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Ngày tạo</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       value={
//                         field.value
//                           ? new Date(field.value)
//                               .toLocaleString('vi-VN', {
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                                 day: '2-digit',
//                                 month: '2-digit',
//                                 year: 'numeric',
//                                 hour12: false
//                               })
//                               .replace(',', '')
//                           : ''
//                       }
//                       readOnly
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="code"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Mã yêu cầu vật tư</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="creator.fullname"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Người tạo</FormLabel>
//                   <FormControl>
//                     <Input {...field} readOnly />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-2">
//             <FormField
//               control={form.control}
//               name="company"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Công ty</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="project.name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Dự án</FormLabel>
//                   <FormControl>
//                     <Input {...field} readOnly />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="site"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Địa điểm</FormLabel>
//                   <FormControl>
//                     <Input {...field} readOnly />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="type"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Loại yêu cầu</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       readOnly
//                       value={field.value === 'normal' ? 'Bình thường' : 'Cần gấp'}
//                       className={field.value === 'urgent' ? 'text-red-500' : ''}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="grid grid-cols-1 gap-2">
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Mô tả</FormLabel>
//                   <FormControl>
//                     <Textarea {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div>
//             <h3 className="mb-2 text-lg font-semibold">Sản phẩm yêu cầu</h3>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Mã sản phẩm</TableHead>
//                   <TableHead>Tên sản phẩm</TableHead>
//                   <TableHead>Số lượng yêu cầu</TableHead>
//                   <TableHead>Mô tả</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {Array.isArray(data?.requestProducts)
//                   ? data.requestProducts.map((product, index) => (
//                       <TableRow key={index}>
//                         <TableCell>{product.product.code}</TableCell>
//                         <TableCell>{product.product.name}</TableCell>
//                         <TableCell>{product.requestQuantity}</TableCell>
//                         <TableCell>{product.product.description || 'N/A'}</TableCell>
//                       </TableRow>
//                     ))
//                   : null}
//               </TableBody>
//             </Table>
//           </div>
//         </form>
//       </Form>
//     </div>
//   )
// }
