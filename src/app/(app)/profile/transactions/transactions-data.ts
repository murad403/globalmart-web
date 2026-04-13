export type TransactionStatus = 'Completed' | 'Processing' | 'Pending' | 'Failed' | 'Refunded'
export type TransactionType = 'Payment' | 'Refund' | 'Transfer' | 'Withdrawal' | 'Credit'
export type TransactionMethod = 'Credit Card' | 'PayPal' | 'Apple Pay' | 'Google Pay' | 'Bank Transfer' | 'Amazon Pay'

export type TransactionRecord = {
  id: string
  date: string
  time: string
  amount: number
  paymentMethod: TransactionMethod
  status: TransactionStatus
  linkedOrder?: string
  billing: string
  location: string
  type: TransactionType
  receiptNumber: string
  transactionDate: string
  notes: string
  cardEnding?: string
  customerName: string
  addressLine1: string
  addressLine2: string
}

export const transactions: TransactionRecord[] = [
  {
    id: 'TXN-2026-001234',
    date: 'Apr 5, 2026',
    time: '2:23:45 PM',
    amount: -549.98,
    paymentMethod: 'Credit Card',
    status: 'Completed',
    linkedOrder: '#12345',
    billing: 'San Francisco',
    location: 'San Francisco',
    type: 'Payment',
    receiptNumber: 'RCP-549987654321',
    transactionDate: 'April 5, 2026',
    notes: 'Payment processed successfully for order #12345.',
    cardEnding: '4242',
    customerName: 'John Smith',
    addressLine1: '123 Main Street, Apt 4B',
    addressLine2: 'San Francisco, CA 94102'
  },
  {
    id: 'TXN-2026-001235',
    date: 'Apr 6, 2026',
    time: '10:15:10 AM',
    amount: -1299.99,
    paymentMethod: 'Credit Card',
    status: 'Completed',
    linkedOrder: '#12346',
    billing: 'Portland',
    location: 'Portland',
    type: 'Payment',
    receiptNumber: 'RCP-129998877665',
    transactionDate: 'April 6, 2026',
    notes: 'Payment processed successfully for order #12346.',
    cardEnding: '7777',
    customerName: 'Alex Parker',
    addressLine1: '55 Burnside Ave',
    addressLine2: 'Portland, OR 97205'
  },
  {
    id: 'TXN-2026-001236',
    date: 'Apr 7, 2026',
    time: '9:05:10 AM',
    amount: -279.96,
    paymentMethod: 'PayPal',
    status: 'Completed',
    linkedOrder: '#12347',
    billing: 'Seattle',
    location: 'Seattle',
    type: 'Payment',
    receiptNumber: 'RCP-279960012347',
    transactionDate: 'April 7, 2026',
    notes: 'Payment processed successfully for order #12347.',
    customerName: 'Mila Carter',
    addressLine1: '845 Pine Street',
    addressLine2: 'Seattle, WA 98101'
  },
  {
    id: 'TXN-2026-001237',
    date: 'Apr 7, 2026',
    time: '11:45:05 AM',
    amount: -999.99,
    paymentMethod: 'Amazon Pay',
    status: 'Pending',
    linkedOrder: '#12348',
    billing: 'Austin',
    location: 'Austin',
    type: 'Payment',
    receiptNumber: 'RCP-999990001248',
    transactionDate: 'April 7, 2026',
    notes: 'Payment pending for order #12348.',
    customerName: 'Noah Brooks',
    addressLine1: '80 Congress Ave',
    addressLine2: 'Austin, TX 78701'
  },
  {
    id: 'TXN-2026-001238',
    date: 'Apr 4, 2026',
    time: '1:30:08 PM',
    amount: -449.99,
    paymentMethod: 'Credit Card',
    status: 'Completed',
    linkedOrder: '#12349',
    billing: 'Denver',
    location: 'Denver',
    type: 'Payment',
    receiptNumber: 'RCP-449990001249',
    transactionDate: 'April 4, 2026',
    notes: 'Payment processed successfully for order #12349.',
    cardEnding: '8181',
    customerName: 'Emma Stone',
    addressLine1: '94 Curtis St',
    addressLine2: 'Denver, CO 80202'
  },
  {
    id: 'TXN-2026-001239',
    date: 'Apr 3, 2026',
    time: '3:59:59 PM',
    amount: -279.98,
    paymentMethod: 'Credit Card',
    status: 'Refunded',
    linkedOrder: '#12350',
    billing: 'Miami',
    location: 'Miami',
    type: 'Refund',
    receiptNumber: 'RCP-279980001250',
    transactionDate: 'April 3, 2026',
    notes: 'Refund issued for canceled order #12350.',
    cardEnding: '7777',
    customerName: 'Jessica Taylor',
    addressLine1: '987 Birch Street',
    addressLine2: 'Miami, FL 33101'
  },
  {
    id: 'TXN-2026-001240',
    date: 'Apr 8, 2026',
    time: '8:45:19 AM',
    amount: -1899.99,
    paymentMethod: 'Credit Card',
    status: 'Processing',
    linkedOrder: '#12351',
    billing: 'Boston',
    location: 'Boston',
    type: 'Payment',
    receiptNumber: 'RCP-189990001251',
    transactionDate: 'April 8, 2026',
    notes: 'Payment is processing for order #12351.',
    cardEnding: '1166',
    customerName: 'Ethan Cole',
    addressLine1: '501 Beacon St',
    addressLine2: 'Boston, MA 02116'
  },
  {
    id: 'TXN-2026-001241',
    date: 'Apr 6, 2026',
    time: '12:33:55 PM',
    amount: -149.99,
    paymentMethod: 'Apple Pay',
    status: 'Completed',
    linkedOrder: '#12352',
    billing: 'Chicago',
    location: 'Chicago',
    type: 'Payment',
    receiptNumber: 'RCP-149990001252',
    transactionDate: 'April 6, 2026',
    notes: 'Payment processed successfully for order #12352.',
    customerName: 'Olivia James',
    addressLine1: '905 W Monroe',
    addressLine2: 'Chicago, IL 60607'
  },
  {
    id: 'TXN-2026-001242',
    date: 'Apr 5, 2026',
    time: '7:18:40 PM',
    amount: -249.99,
    paymentMethod: 'Google Pay',
    status: 'Completed',
    linkedOrder: '#12353',
    billing: 'Phoenix',
    location: 'Phoenix',
    type: 'Payment',
    receiptNumber: 'RCP-249990001253',
    transactionDate: 'April 5, 2026',
    notes: 'Payment processed successfully for order #12353.',
    customerName: 'Lucas Reed',
    addressLine1: '288 Desert Ave',
    addressLine2: 'Phoenix, AZ 85004'
  },
  {
    id: 'TXN-2026-001243',
    date: 'Apr 2, 2026',
    time: '9:12:14 AM',
    amount: -219.96,
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
    linkedOrder: '#12354',
    billing: 'Nashville',
    location: 'Nashville',
    type: 'Payment',
    receiptNumber: 'RCP-219960001254',
    transactionDate: 'April 2, 2026',
    notes: 'Payment processed successfully for order #12354.',
    customerName: 'Ava Hall',
    addressLine1: '40 Music Sq',
    addressLine2: 'Nashville, TN 37203'
  },
  {
    id: 'TXN-2026-001244',
    date: 'Mar 31, 2026',
    time: '4:25:10 PM',
    amount: -599.99,
    paymentMethod: 'Credit Card',
    status: 'Completed',
    linkedOrder: '#12355',
    billing: 'Charlotte',
    location: 'Charlotte',
    type: 'Payment',
    receiptNumber: 'RCP-599990001255',
    transactionDate: 'March 31, 2026',
    notes: 'Payment processed successfully for order #12355.',
    cardEnding: '1234',
    customerName: 'Mason Lee',
    addressLine1: '220 Tryon St',
    addressLine2: 'Charlotte, NC 28202'
  },
  {
    id: 'TXN-2026-001245',
    date: 'Apr 8, 2026',
    time: '11:41:00 AM',
    amount: 89.99,
    paymentMethod: 'Credit Card',
    status: 'Completed',
    linkedOrder: '#12356',
    billing: 'San Francisco',
    location: 'San Francisco',
    type: 'Credit',
    receiptNumber: 'RCP-089990001256',
    transactionDate: 'April 8, 2026',
    notes: 'Refund adjustment recorded.',
    cardEnding: '7642',
    customerName: 'Sophia Turner',
    addressLine1: '13 Market Street',
    addressLine2: 'San Francisco, CA 94105'
  },
  {
    id: 'TXN-2026-001246',
    date: 'Apr 7, 2026',
    time: '6:30:20 PM',
    amount: -35.0,
    paymentMethod: 'Credit Card',
    status: 'Failed',
    linkedOrder: undefined,
    billing: 'Dallas',
    location: 'Dallas',
    type: 'Payment',
    receiptNumber: 'RCP-035000001257',
    transactionDate: 'April 7, 2026',
    notes: 'Payment failed due to card verification issue.',
    cardEnding: '1456',
    customerName: 'Isabella Moore',
    addressLine1: '901 Main Street',
    addressLine2: 'Dallas, TX 75202'
  }
]

export const statusOptions: Array<'All Status' | TransactionStatus> = ['All Status', 'Completed', 'Processing', 'Pending', 'Refunded', 'Failed']
export const methodOptions: Array<'All Methods' | TransactionMethod> = ['All Methods', 'Credit Card', 'PayPal', 'Apple Pay', 'Google Pay', 'Bank Transfer', 'Amazon Pay']
export const timeOptions = ['All Time', 'Last 7 Days', 'Last 30 Days', 'This Year'] as const
