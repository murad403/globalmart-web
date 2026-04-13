import React from 'react'
import NewArrivals from '../home/NewArrivals'
import ProductListings from '../home/ProductListings'
import Subscribe from '@/components/shared/Subscribe'
import ReSellerBanner from './ReSellerBanner'
import ReSellerGuide from './ReSellerGuide'
import WhyChooseOurPlatform from './WhyChooseOurPlatform'

const page = () => {
    return (
        <div className="w-full space-y-12 md:space-y-18">
            <ReSellerBanner />
            <div className='bg-[#F9FAFB]'>
                <WhyChooseOurPlatform />

                <div className='xl:px-10 px-4 md:pb-14'>
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
