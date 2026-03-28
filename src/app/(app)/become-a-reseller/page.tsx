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
            <ReSellerBanner />
            <div className='bg-[#F9FAFB]'>
                <WhyChooseOurPlatform />

                <div className='md:px-10 md:pb-10'>
                    <ReSellerGuide />
                </div>
            </div>
            <NewArrivals />
            <ProductListings />
            <Subscribe />
        </div>
    )
}

export default page
