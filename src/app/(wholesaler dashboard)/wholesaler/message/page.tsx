import React from 'react'
import WholeSalerPageHeader from '../_components/WholeSalerPageHeader'
import Messages from './Messages'

const page = () => {
    return (
        <div className="space-y-4 sm:space-y-5">
            <WholeSalerPageHeader title='Message' description='Message with Resaller' />
            <Messages />
        </div>
    )
}

export default page
