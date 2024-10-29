import { useState } from 'react'

import { DialogAddProductInRequisitionUpdate } from '@/components/app/dialog'
import { IProductInfo } from '@/types'

export default function ProductRequisitionUpdateActionOptions() {
  const [product, setProduct] = useState<IProductInfo | null>(null)

  return (
    <>
      <DialogAddProductInRequisitionUpdate product={product} />
    </>
  )
}
