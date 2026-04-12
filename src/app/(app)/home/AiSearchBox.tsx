'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Search, Camera } from 'lucide-react'

const AiSearchBox = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [searchText, setSearchText] = useState('')
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Show on scroll up
            if (currentScrollY < lastScrollY) {
                setIsVisible(true)
            }
            // Hide on scroll down (when scrolled more than 100px)
            else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImage(file)
        }
    }

    const handleSearch = () => {
        if (searchText || selectedImage) {
            console.log('Search:', { text: searchText, image: selectedImage })
            // Add your search logic here
        }
    }

    return (
        <div
            className={`fixed top-22 md:top-27 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-[calc(100%+6rem)] md:-translate-y-[calc(100%+7.5rem)]'
                }`}
        >
            <div className="w-full bg-white py-4 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex items-center justify-between gap-4 border-2 border-button-start rounded-2xl px-6 py-4 bg-white">
                        <div className='space-y-4'>
                            {/* Text Input */}
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                className="flex-1 bg-transparent text-sm placeholder-gray-400 outline-none"
                            />

                            {/* Image Search Button */}
                            <button
                                onClick={handleImageClick}
                                className="flex items-center gap-2 text-gray-700 hover:text-button-start transition-colors font-medium text-sm whitespace-nowrap"
                            >
                                <Camera className="w-5 h-5" />
                                Image Search
                            </button>
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            className="flex items-center gap-2 px-6 py-2.5 bg-button-start hover:bg-button-end text-white rounded-lg border-0 transition-all font-medium text-sm active:scale-95 whitespace-nowrap"
                        >
                            <Search className="w-4 h-4" />
                            Search
                        </button>

                        {/* Hidden File Input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiSearchBox
