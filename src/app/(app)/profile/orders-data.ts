import type { StaticImageData } from 'next/image'
import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import product3 from '@/assets/home/product3.png'
import arrivals1 from '@/assets/home/arrivals1.png'
import arrivals2 from '@/assets/home/arrivals2.png'

export type OrderStatus = 'Delivered' | 'Shipped' | 'Processing' | 'Pending' | 'Canceled'

export type OrderItem = {
  name: string
  qty: number
  size: string
  color: string
  price: number
  image: StaticImageData
}

export type ProfileOrder = {
  id: string
  date: string
  shipping: string
  total: number
  status: OrderStatus
  products: OrderItem[]
  customerName: string
  addressLine1: string
  addressLine2: string
  phone: string
  paymentMethod: string
  trackingId?: string
  courier?: string
  estimatedDelivery?: string
  cancellationReason?: string
  canceledBy?: string
  cancellationDate?: string
}

export const profileOrders: ProfileOrder[] = [
  {
    id: '12345',
    date: 'Apr 5, 2026',
    shipping: 'San Francisco, CA',
    total: 549.98,
    status: 'Shipped',
    products: [
      { name: 'Wireless Noise-Canceling Headphones', qty: 1, size: 'Black', color: 'Black', price: 249.99, image: product1 },
      { name: 'Fitness Smartwatch', qty: 2, size: '42mm', color: 'Silver', price: 299.99, image: product2 }
    ],
    customerName: 'John Smith',
    addressLine1: '172 Main Street, Apt 4B',
    addressLine2: 'San Francisco, CA 94103',
    phone: '+1 (555) 123-4567',
    paymentMethod: 'Visa ending in 4242',
    trackingId: 'FDX1234567890',
    courier: 'FedEx',
    estimatedDelivery: 'April 7, 2026'
  },
  {
    id: '12346',
    date: 'Apr 6, 2026',
    shipping: 'Portland, OR',
    total: 1299.99,
    status: 'Shipped',
    products: [{ name: 'Pro Laptop 15-inch', qty: 1, size: '512GB', color: 'Space Gray', price: 1299.99, image: arrivals1 }],
    customerName: 'Alex Parker',
    addressLine1: '55 Burnside Ave',
    addressLine2: 'Portland, OR 97205',
    phone: '+1 (555) 567-8910',
    paymentMethod: 'Mastercard ending in 7777',
    trackingId: 'UPS778899001',
    courier: 'UPS',
    estimatedDelivery: 'April 8, 2026'
  },
  {
    id: '12347',
    date: 'Apr 7, 2026',
    shipping: 'Seattle, WA',
    total: 279.96,
    status: 'Processing',
    products: [{ name: 'Classic Casual T-Shirt', qty: 2, size: 'L', color: 'Navy Blue', price: 279.96, image: arrivals2 }],
    customerName: 'Mila Carter',
    addressLine1: '845 Pine Street',
    addressLine2: 'Seattle, WA 98101',
    phone: '+1 (555) 876-9033',
    paymentMethod: 'Visa ending in 3232'
  },
  {
    id: '12348',
    date: 'Apr 7, 2026',
    shipping: 'Austin, TX',
    total: 999.99,
    status: 'Pending',
    products: [{ name: 'Premium Smartphone', qty: 1, size: '128GB', color: 'Midnight', price: 999.99, image: product3 }],
    customerName: 'Noah Brooks',
    addressLine1: '80 Congress Ave',
    addressLine2: 'Austin, TX 78701',
    phone: '+1 (555) 200-1122',
    paymentMethod: 'Amex ending in 9401'
  },
  {
    id: '12349',
    date: 'Apr 4, 2026',
    shipping: 'Denver, CO',
    total: 449.99,
    status: 'Delivered',
    products: [{ name: 'Espresso Coffee Maker', qty: 1, size: '1L', color: 'Silver', price: 449.99, image: arrivals1 }],
    customerName: 'Emma Stone',
    addressLine1: '94 Curtis St',
    addressLine2: 'Denver, CO 80202',
    phone: '+1 (555) 918-7788',
    paymentMethod: 'Visa ending in 2409'
  },
  {
    id: '12350',
    date: 'Apr 3, 2026',
    shipping: 'Miami, FL',
    total: 279.98,
    status: 'Canceled',
    products: [
      { name: 'Designer Sunglasses', qty: 1, size: 'Black/Gold', color: 'Black/Gold', price: 199.99, image: product1 },
      { name: 'Slim Fit Denim Jeans', qty: 1, size: '32x32', color: 'Dark Blue', price: 79.99, image: product2 }
    ],
    customerName: 'Jessica Taylor',
    addressLine1: '987 Birch Street',
    addressLine2: 'Miami, FL 33101',
    phone: '+1 (555) 678-9012',
    paymentMethod: 'Mastercard ending in 7777',
    cancellationReason: 'Product not needed',
    canceledBy: 'Jessica Taylor',
    cancellationDate: 'April 3, 2026'
  },
  {
    id: '12351',
    date: 'Apr 8, 2026',
    shipping: 'Boston, MA',
    total: 1899.99,
    status: 'Processing',
    products: [{ name: 'Professional DSLR Camera', qty: 1, size: 'Body Only', color: 'Black', price: 1899.99, image: product3 }],
    customerName: 'Ethan Cole',
    addressLine1: '501 Beacon St',
    addressLine2: 'Boston, MA 02116',
    phone: '+1 (555) 776-8891',
    paymentMethod: 'Mastercard ending in 1166'
  },
  {
    id: '12352',
    date: 'Apr 6, 2026',
    shipping: 'Chicago, IL',
    total: 149.99,
    status: 'Shipped',
    products: [{ name: 'Mechanical Gaming Keyboard', qty: 1, size: 'Switch Cherry MX Blue', color: 'Red/Black', price: 149.99, image: arrivals2 }],
    customerName: 'Olivia James',
    addressLine1: '905 W Monroe',
    addressLine2: 'Chicago, IL 60607',
    phone: '+1 (555) 333-2209',
    paymentMethod: 'Visa ending in 9999',
    trackingId: 'USPS00110033',
    courier: 'USPS',
    estimatedDelivery: 'April 9, 2026'
  },
  {
    id: '12353',
    date: 'Apr 5, 2026',
    shipping: 'Phoenix, AZ',
    total: 249.99,
    status: 'Delivered',
    products: [{ name: 'Wireless Noise-Canceling Headphones', qty: 1, size: 'M', color: 'Olive', price: 249.99, image: product1 }],
    customerName: 'Lucas Reed',
    addressLine1: '288 Desert Ave',
    addressLine2: 'Phoenix, AZ 85004',
    phone: '+1 (555) 881-7784',
    paymentMethod: 'Visa ending in 1818'
  },
  {
    id: '12354',
    date: 'Apr 2, 2026',
    shipping: 'Nashville, TN',
    total: 219.96,
    status: 'Delivered',
    products: [{ name: 'Premium Running Shoes', qty: 1, size: '9', color: 'Black/Red', price: 219.96, image: arrivals1 }],
    customerName: 'Ava Hall',
    addressLine1: '40 Music Sq',
    addressLine2: 'Nashville, TN 37203',
    phone: '+1 (555) 114-6677',
    paymentMethod: 'Mastercard ending in 8181'
  }
]

export const orderStatusOptions: Array<'All Status' | OrderStatus> = [
  'All Status',
  'Delivered',
  'Shipped',
  'Processing',
  'Pending',
  'Canceled'
]

export const orderTimeOptions = ['All Time', 'Last 7 Days', 'Last 30 Days', 'This Year'] as const
