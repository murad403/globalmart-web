import React from 'react'
import ProductDetails from './ProductDetails'
import ProductFeatures from './ProductFeatures'
import RelatedProducts from './RelatedProducts'


const page = () => {
  return (
    <div className='space-y-8 md:space-y-12'>
      <ProductDetails />
      <ProductFeatures />
      <RelatedProducts/>
    </div>
  )
}

export default page
