import React from 'react'
import ProductDetails from './ProductDetails'
import ProductFeatures from './ProductFeatures'
import RelatedProducts from './RelatedProducts'


const page = () => {
  return (
    <div>
      <ProductDetails />
      <ProductFeatures />
      <RelatedProducts/>
    </div>
  )
}

export default page
