import { IProductInfoSearch } from '@/types'

const productList: { items: IProductInfoSearch[] } = {
  items: [
    {
      productCode: 'P001',
      productName: 'Laptop Dell XPS 13',
      modelOrSerialNumber: 'XPS9370',
      supplier: 'Dell Inc.',
      importDate: '2023-08-01',
      unit: 'pcs',
      quantity: 50,
      address: '123 Tech Road, HCMC',
      note: 'New model'
    },
    {
      productCode: 'P002',
      productName: 'Apple iPhone 13',
      modelOrSerialNumber: 'A2410',
      supplier: 'Apple Inc.',
      importDate: '2023-07-15',
      unit: 'pcs',
      quantity: 120,
      address: '456 Mobile Street, HCMC'
    },
    {
      productCode: 'P003',
      productName: 'Samsung Galaxy S21',
      modelOrSerialNumber: 'SM-G991B',
      supplier: 'Samsung Electronics',
      importDate: '2023-07-20',
      unit: 'pcs',
      quantity: 100,
      address: '789 Electronics Ave, Hanoi'
    },
    {
      productCode: 'P004',
      productName: 'Sony WH-1000XM4',
      modelOrSerialNumber: 'WH1000XM4',
      supplier: 'Sony Corporation',
      importDate: '2023-06-30',
      unit: 'pcs',
      quantity: 200,
      address: '101 Audio Lane, HCMC',
      note: 'Noise-cancelling'
    },
    {
      productCode: 'P005',
      productName: 'HP LaserJet Pro MFP',
      modelOrSerialNumber: 'M428fdw',
      supplier: 'HP Inc.',
      importDate: '2023-07-05',
      unit: 'pcs',
      quantity: 30,
      address: '303 Printer Blvd, Hanoi'
    },
    {
      productCode: 'P006',
      productName: 'Microsoft Surface Pro 7',
      modelOrSerialNumber: '1866',
      supplier: 'Microsoft',
      importDate: '2023-08-10',
      unit: 'pcs',
      quantity: 60,
      address: '400 Software Ave, HCMC'
    },
    {
      productCode: 'P007',
      productName: 'Asus ROG Strix G15',
      modelOrSerialNumber: 'G512LI',
      supplier: 'Asus',
      importDate: '2023-08-12',
      unit: 'pcs',
      quantity: 40,
      address: '150 Gaming Lane, HCMC',
      note: 'Gaming laptop'
    },
    {
      productCode: 'P008',
      productName: 'Acer Predator Helios 300',
      modelOrSerialNumber: 'PH315-53',
      supplier: 'Acer',
      importDate: '2023-07-25',
      unit: 'pcs',
      quantity: 75,
      address: '200 Predator Ave, HCMC'
    },
    {
      productCode: 'P009',
      productName: 'Canon EOS 5D Mark IV',
      modelOrSerialNumber: '1483C002',
      supplier: 'Canon Inc.',
      importDate: '2023-06-20',
      unit: 'pcs',
      quantity: 25,
      address: '500 Camera Street, Hanoi'
    },
    {
      productCode: 'P010',
      productName: 'Nikon D850',
      modelOrSerialNumber: '1597',
      supplier: 'Nikon Corporation',
      importDate: '2023-06-22',
      unit: 'pcs',
      quantity: 30,
      address: '600 Camera Ave, Hanoi',
      note: 'Full-frame DSLR'
    },
    {
      productCode: 'P011',
      productName: 'LG 4K OLED TV',
      modelOrSerialNumber: 'OLED55CXPUA',
      supplier: 'LG Electronics',
      importDate: '2023-05-15',
      unit: 'pcs',
      quantity: 80,
      address: '123 TV Street, HCMC'
    },
    {
      productCode: 'P012',
      productName: 'Bose QuietComfort 35 II',
      modelOrSerialNumber: 'QC35II',
      supplier: 'Bose Corporation',
      importDate: '2023-04-18',
      unit: 'pcs',
      quantity: 150,
      address: '456 Audio Lane, HCMC',
      note: 'Wireless headphones'
    },
    {
      productCode: 'P013',
      productName: 'GoPro HERO9 Black',
      modelOrSerialNumber: 'CHDHX-901',
      supplier: 'GoPro Inc.',
      importDate: '2023-06-10',
      unit: 'pcs',
      quantity: 90,
      address: '789 Action Cam Road, Hanoi'
    },
    {
      productCode: 'P014',
      productName: 'Apple MacBook Pro 16',
      modelOrSerialNumber: 'MVVJ2SA/A',
      supplier: 'Apple Inc.',
      importDate: '2023-03-28',
      unit: 'pcs',
      quantity: 50,
      address: '789 Laptop Street, HCMC'
    },
    {
      productCode: 'P015',
      productName: 'Lenovo ThinkPad X1 Carbon',
      modelOrSerialNumber: '20U9005PUS',
      supplier: 'Lenovo',
      importDate: '2023-07-11',
      unit: 'pcs',
      quantity: 40,
      address: '987 Office Lane, Hanoi'
    },
    {
      productCode: 'P016',
      productName: 'Dyson V11 Vacuum Cleaner',
      modelOrSerialNumber: 'V11',
      supplier: 'Dyson',
      importDate: '2023-05-22',
      unit: 'pcs',
      quantity: 60,
      address: '654 Home Appliance Road, HCMC'
    },
    {
      productCode: 'P017',
      productName: 'Sony PlayStation 5',
      modelOrSerialNumber: 'CFI-1015A',
      supplier: 'Sony Corporation',
      importDate: '2023-04-30',
      unit: 'pcs',
      quantity: 110,
      address: '111 Gaming Road, HCMC',
      note: 'Next-gen console'
    },
    {
      productCode: 'P018',
      productName: 'DJI Mavic Air 2',
      modelOrSerialNumber: 'CP.MA.00000176',
      supplier: 'DJI',
      importDate: '2023-06-12',
      unit: 'pcs',
      quantity: 70,
      address: '900 Drone Lane, Hanoi'
    },
    {
      productCode: 'P019',
      productName: 'Samsung 970 EVO Plus SSD',
      modelOrSerialNumber: 'MZ-V7S1T0B/AM',
      supplier: 'Samsung',
      importDate: '2023-07-05',
      unit: 'pcs',
      quantity: 200,
      address: '400 SSD Lane, HCMC',
      note: '1TB NVMe SSD'
    },
    {
      productCode: 'P020',
      productName: 'Western Digital My Passport',
      modelOrSerialNumber: 'WDBYVG0010BBK-WESN',
      supplier: 'Western Digital',
      importDate: '2023-08-14',
      unit: 'pcs',
      quantity: 300,
      address: '555 Storage Road, Hanoi'
    }
  ]
}

export default productList
