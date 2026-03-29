import type { StaticImageData } from 'next/image'
import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import product3 from '@/assets/home/product3.png'
import arrivals1 from '@/assets/home/arrivals1.png'
import arrivals2 from '@/assets/home/arrivals2.png'
import arrivals3 from '@/assets/home/arrivals3.png'
import arrivals4 from '@/assets/home/arrivals4.png'

export type CheckoutProduct = {
  id: string
  name: string
  fit: string
  color: string
  price: number
  image: StaticImageData
}

export const checkoutProducts: CheckoutProduct[] = [
  {
    id: 'p-1',
    name: '2 Pieces Mango set',
    fit: 'Regular fit',
    color: 'Mustard',
    price: 25.99,
    image: product1
  },
  {
    id: 'p-2',
    name: '3 Pieces Mango set',
    fit: 'Casual fit',
    color: 'Blue',
    price: 32.99,
    image: product2
  },
  {
    id: 'p-3',
    name: 'Zara Cardigan',
    fit: 'Regular fit',
    color: 'Burgundy',
    price: 40.25,
    image: product3
  }
]

export const orderSummary = {
  price: 99.23,
  shipping: 2,
  tax: 2,
  discount: 47.1,
  giftBox: 10.9,
  total: 110.13
}

export const youMayAlsoLike = [
  {
    id: 'y-1',
    name: 'Short Printed Dress',
    currentPrice: 69.99,
    oldPrice: 129.99,
    discount: '40%',
    image: arrivals1
  },
  {
    id: 'y-2',
    name: 'Short Printed Dress',
    currentPrice: 69.99,
    oldPrice: 129.99,
    discount: '45%',
    image: arrivals2
  },
  {
    id: 'y-3',
    name: 'Short Printed Dress',
    currentPrice: 69.99,
    oldPrice: 129.99,
    discount: '45%',
    image: arrivals3
  },
  {
    id: 'y-4',
    name: 'Short Printed Dress',
    currentPrice: 69.99,
    oldPrice: 129.99,
    discount: '40%',
    image: arrivals4
  },
  {
    id: 'y-5',
    name: 'Short Printed Dress',
    currentPrice: 69.99,
    oldPrice: 129.99,
    discount: '40%',
    image: arrivals1
  }
]

export const paymentMethods = [
  {
    id: 'paypal',
    title: 'Paypal',
    description:
      'PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically.'
  },
  {
    id: 'mastercard',
    title: 'Mastercard',
    description:
      'Pay by debit or credit card from any major bank with end-to-end transaction protection.'
  },
  {
    id: 'bitcoin',
    title: 'Bitcoin',
    description:
      'Use cryptocurrency payments for a modern checkout process with fast transfer confirmation.'
  }
]

export const shippingMethods = [
  {
    id: 'ausff',
    title: 'AUSFF',
    deliveryTime: '14-21 days',
    shippingCost: 16,
    insurance: 'Unavailable'
  },
  {
    id: 'racecouriers',
    title: 'RaceCouriers',
    deliveryTime: '12-18 days',
    shippingCost: 10,
    insurance: 'Available'
  },
  {
    id: 'transcocargo',
    title: 'TranscoCargo',
    deliveryTime: '14-22 days',
    shippingCost: 12,
    insurance: 'Available'
  }
]

export type WishlistItem = {
  id: string
  name: string
  description: string
  oldPrice?: number
  price: number
  inStock: boolean
  image: StaticImageData
}

export const initialWishlistItems: WishlistItem[] = [
  {
    id: 'w-1',
    name: 'Bose Sport Earbuds',
    description: 'Wireless Earphones, Bluetooth In Ear Headphones for Workouts and Running, Triple Black',
    oldPrice: 1099,
    price: 999,
    inStock: true,
    image: arrivals1
  },
  {
    id: 'w-2',
    name: 'Simple Mobile 5G LTE Galaxy',
    description: '12 Mini 512GB Gaming Phone',
    price: 2300,
    inStock: true,
    image: arrivals2
  },
  {
    id: 'w-3',
    name: 'Portable Washing Machine',
    description: '11lbs capacity Model 18NMF/AM',
    price: 70,
    inStock: true,
    image: arrivals3
  },
  {
    id: 'w-4',
    name: 'TOZO T6 True Wireless Earbuds',
    description: 'Bluetooth Headphones with Touch Control and Wireless Charging Case IPX8 waterproof Stereo Sound',
    oldPrice: 250,
    price: 220,
    inStock: false,
    image: arrivals4
  },
  {
    id: 'w-5',
    name: 'Wyze Cam Pan v2',
    description: '1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart Home Camera with Color Night Vision, 2-Way Audio',
    price: 1499.99,
    inStock: true,
    image: product1
  }
]

export const orderActivity = [
  {
    id: 'a-1',
    title: 'Your order has been delivered. Thank you for shopping at Globalmart!',
    date: '23 Jan, 2021 at 7:32 PM'
  },
  {
    id: 'a-2',
    title: 'Our delivery man (John Wick) has picked-up your order for delivery.',
    date: '23 Jan, 2021 at 2:00 PM'
  },
  {
    id: 'a-3',
    title: 'Your order has reached at last mile hub.',
    date: '22 Jan, 2021 at 8:00 AM'
  },
  {
    id: 'a-4',
    title: 'Your order on the way to last mile hub.',
    date: '21 Jan, 2021 at 5:32 AM'
  },
  {
    id: 'a-5',
    title: 'Your order is successfully verified.',
    date: '20 Jan, 2021 at 7:32 PM'
  },
  {
    id: 'a-6',
    title: 'Your order has been confirmed.',
    date: '19 Jan, 2021 at 2:61 PM'
  }
]