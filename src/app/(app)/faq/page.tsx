'use client'

import React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const faqData = [
    {
        id: 'payment',
        question: 'What payment methods do you accept on Cartopia?',
        answer: 'We accept payments in unicorn tears, leprechaun gold, and wishes upon a star. Just kidding! We accept all major credit cards, PayPal, and, of course, the ever-elusive cryptocurrency of your dreams.'
    },
    {
        id: 'tracking',
        question: 'How do I track my order status on Cartopia?',
        answer: 'You can track your order status by logging into your account and navigating to the "My Orders" section. There you can see real-time updates on your order.'
    },
    {
        id: 'return',
        question: 'What is your return policy for items purchased from Cartopia?',
        answer: 'We offer a 30-day return policy for most items. Products must be in original condition with all packaging and accessories included. Please visit our Returns page for more details.'
    },
    {
        id: 'promotions',
        question: 'Are there any ongoing promotions or discounts available on Cartopia?',
        answer: 'Yes! We regularly offer promotional discounts and special deals. You can find our latest promotions on our homepage or subscribe to our newsletter for exclusive offers.'
    }
]

const page = () => {
    return (
        <div className="w-full py-8 md:py-12">
            <div className="container mx-auto px-4">
                {/* Greeting Section */}
                <div className="mb-12">
                    <div className="flex items-start gap-3 mb-6">
                        <span className="text-4xl md:text-5xl">👋</span>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-title leading-tight">
                                Hey there,<br />
                                How may we help you?
                            </h1>
                        </div>
                    </div>
                </div>

                {/* FAQ Heading */}
                <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-title mb-8">
                        Frequently asked questions
                    </h2>
                </div>

                {/* FAQ Accordion */}
                <div className='max-w-5xl mx-auto'>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqData.map((item) => (
                            <AccordionItem key={item.id} value={item.id} className="bg-[#F8FAFE] rounded-lg border-0 px-6">
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default page
