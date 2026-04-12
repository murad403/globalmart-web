import React from 'react'
import Hero from './home/Hero'
import Features from './home/Features'
import WhyChooseUs from './home/WhyChooseUs'
import FlashSales from './home/FlashSales'
import ShopByCategories from './home/ShopByCategories'
import FeaturedProducts from './home/FeaturedProducts'
import NewArrivals from './home/NewArrivals'
import ProductListings from './home/ProductListings'
import Subscribe from '../../components/shared/Subscribe'
import AiSearchBox from './home/AiSearchBox'

const page = () => {
  return (
    <div className="w-full space-y-8 pt-28 md:pt-32">
      <AiSearchBox />
      <div>
        <Hero />
      </div>
      <Features />
      <WhyChooseUs />
      <FlashSales />
      <ShopByCategories />
      <FeaturedProducts />
      <NewArrivals />
      <ProductListings />
      <Subscribe />
    </div>
  )
}

export default page
