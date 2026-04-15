import React from 'react'
import ResellerOverviewStats from './overview/ResellerOverviewStats'
import SalesPerformance from './overview/SalesPerformance'
import RecentCustomerOrders from './overview/RecentCustomerOrders'
import SellerPageHeader from '@/components/shared/SellerPageHeader'

const page = () => {
  return (
    <div className="md:space-y-5 space-y-4">
      <SellerPageHeader title='Overview' description='Your store performance and sales summary' />
      <ResellerOverviewStats />
      <div className="grid gap-4 xl:grid-cols-3">
        <SalesPerformance />
        <RecentCustomerOrders />
      </div>
    </div>
  )
}

export default page
