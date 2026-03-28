import React from 'react'
import NewArrivals from '../home/NewArrivals'
import ProductListings from '../home/ProductListings'
import Subscribe from '@/components/shared/Subscribe'
import ReSellerBanner from './ReSellerBanner'
import ReSellerGuide from './ReSellerGuide'
import WhyChooseOurPlatform from './WhyChooseOurPlatform'

const page = () => {
  return (
    <div className="w-full space-y-8">
      <ReSellerBanner/>
      <WhyChooseOurPlatform/>
      <ReSellerGuide/>
      <NewArrivals/>
      <ProductListings/>
      <Subscribe/>
    </div>
  )
}

export default page
