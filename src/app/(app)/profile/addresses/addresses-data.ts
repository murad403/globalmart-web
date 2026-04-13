export type AddressTabKey = 'shipping' | 'billing'

export type AddressRecord = {
  id: string
  title: string
  defaultLabel?: string
  recipientName: string
  email: string
  phone: string
  line1: string
  line2: string
  location: string
  tab: AddressTabKey
}

export const initialShippingAddresses: AddressRecord[] = [
  {
    id: 'ship-1',
    title: 'Home',
    defaultLabel: 'Default',
    recipientName: 'Marvin McKinney',
    email: 'Marvinmckinney@mail.com',
    phone: '+11762396',
    line1: '409-2 E Washington Blvd',
    line2: 'Los Angeles, CA 90015, United States',
    location: 'Los Angeles, CA',
    tab: 'shipping'
  },
  {
    id: 'ship-2',
    title: 'Office',
    recipientName: 'Marvin McKinney',
    email: 'Marvinmckinney@mail.com',
    phone: '+11762396',
    line1: '409-2 E Washington Blvd',
    line2: 'Los Angeles, CA 90015, United States',
    location: 'Los Angeles, CA',
    tab: 'shipping'
  }
]

export const initialBillingAddresses: AddressRecord[] = [
  {
    id: 'bill-1',
    title: 'Home',
    defaultLabel: 'Default',
    recipientName: 'Marvin McKinney',
    email: 'Marvinmckinney@mail.com',
    phone: '+11762396',
    line1: '409-2 E Washington Blvd',
    line2: 'Los Angeles, CA 90015, United States',
    location: 'Los Angeles, CA',
    tab: 'billing'
  }
]
