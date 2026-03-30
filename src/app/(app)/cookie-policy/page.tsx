import PolicyPageTemplate from '@/components/shared/PolicyPageTemplate'
import React from 'react'

const intro = [
    'All orders are processed within 2 to 3 days and are delivered within 3 to 7 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.',
    'Domestic shipping rates and estimates for calculated shipping rates: Shipping charges for your order will be calculated and displayed at checkout.'
]

const sections = [
    {
        heading: 'In-Store Pickup',
        paragraphs: [
            'We do not offer in-store pickups at this time.'
        ]
    },
    {
        heading: 'International Shipping',
        paragraphs: [
            'Currently, we only sell in India (Domestic orders only).'
        ]
    },
    {
        heading: 'How do I check the status of my order?',
        paragraphs: [
            'When your order has shipped, you will receive an email notification from us which includes a tracking number you can use to check its status. Please allow up to 48 hours for the tracking information to become available.'
        ]
    },
    {
        heading: 'If your order has not arrived',
        paragraphs: [
            'If you have not received your order within 12 days of receiving your shipping confirmation email, please contact us at uniteddeals.contact@gmail.com with your name and order number so we can look into it for you.'
        ]
    },
    {
        heading: 'Delivery Address',
        paragraphs: [
            'A-3/B, 5.G. Towers, Biringi Mondal Para, Benachity, Durgapur, Paschim Bardhaman, West Bengal, India - 713213.'
        ]
    }
]

const page = () => {
    return (
        <div>
            <PolicyPageTemplate title="Cookie Policy" intro={intro} sections={sections} />
        </div>
    )
}

export default page
