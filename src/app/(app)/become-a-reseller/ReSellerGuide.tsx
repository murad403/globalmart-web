import { Button } from '@/components/ui/button'
import React from 'react'

const ReSellerGuide = () => {
  return (
    <section className="w-full bg-[#EFF6FF] px-4 py-14 md:py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-title text-2xl md:text-4xl font-bold leading-tight">
          Start Selling as wholesaler, supplier, or manufacturer
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-description text-sm md:text-base leading-relaxed">
          Are you a wholesaler, supplier, or manufacturer who wants to sell in bulk?
          Contact us to become a verified wholesaler on our platform.
        </p>
        <Button className='mt-4'>
          BECOME A Reseller
        </Button>
      </div>
    </section>
  )
}

export default ReSellerGuide
