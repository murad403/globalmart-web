export type ProfileTab = 'account-details' | 'order-history' | 'address'

export const orderStatuses = ['Completed', 'Processing', 'Cancelled'] as const
export type OrderStatus = (typeof orderStatuses)[number]

export type AddressType = 'Home' | 'Office' | 'Billing' | 'Shipping' | 'Other'

export type AddressItem = {
  id: string
  label: AddressType
  fullName: string
  phone: string
  streetAddress: string
  city: string
  zipCode: string
  country: string
  isDefault: boolean
}

export type OrderHistoryItem = {
  id: string
  numberId: string
  date: string
  status: OrderStatus
  price: number
}

export type AccountDetailsValues = {
  firstName: string
  lastName: string
  displayName: string
  email: string
  oldPassword?: string
  newPassword?: string
  repeatNewPassword?: string
}

export type AddressValues = {
  label: AddressType
  fullName: string
  phone: string
  streetAddress: string
  city: string
  zipCode: string
  country: string
  isDefault: boolean
}
