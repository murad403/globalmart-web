import React from 'react'
import ResellerOverviewStats from './overview/ResellerOverviewStats'
import SalesPerformance from './overview/SalesPerformance'
import RecentCustomerOrders from './overview/RecentCustomerOrders'

const page = () => {
  return (
    <div>
      <ResellerOverviewStats />
      <div>
        <SalesPerformance />
        <RecentCustomerOrders />
      </div>
    </div>
  )
}

export default page
