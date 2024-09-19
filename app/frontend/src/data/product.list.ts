import { IProductInfo } from '@/types'

const productListData: { items: IProductInfo[] } = {
  items: [
    {
      createdAt: new Date().toISOString(),
      code: '123',
      name: 'Vật tư 1',
      provider: 'Công ty 1',
      unit: 'Cái',
      status: 'active',
      description: 'Vật tư 1',
      quantity: '100'
    },
    {
      createdAt: new Date().toISOString(),
      code: '123',
      name: 'Vật tư 2',
      provider: 'Công ty 2',
      unit: 'Cái',
      status: 'active',
      description: 'Vật tư 2',
      quantity: '100'
    },
    {
      createdAt: new Date().toISOString(),
      code: '123',
      name: 'Vật tư 3',
      provider: 'Công ty 3',
      unit: 'Cái',
      status: 'active',
      description: 'Vật tư 3',
      quantity: '100'
    }
  ]
}

export default productListData
