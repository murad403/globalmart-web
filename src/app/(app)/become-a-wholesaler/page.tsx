import React from 'react'
import WhyChooseUs from '../home/WhyChooseUs'
import NewArrivals from '../home/NewArrivals'
import ProductListings from '../home/ProductListings'
import Subscribe from '@/components/shared/Subscribe'
import WholeSalerBanner from './WholeSalerBanner'
import WholeSalerGuide from './WholeSalerGuide'

const page = () => {
  return (
    <div className="w-full space-y-12 md:space-y-18">
        <WholeSalerBanner/>
        <WhyChooseUs/>
        <WholeSalerGuide/>
        <NewArrivals/>
        <ProductListings/>
        <Subscribe/>
    </div>
  )
}

export default page
