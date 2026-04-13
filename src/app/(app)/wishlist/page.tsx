"use client"
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation"
import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import product3 from '@/assets/home/product3.png'
import ProductCard from "@/components/shared/ProductCard";

const wishlistProducts = [
    {
        title: 'BenQ ScreenBar Halo LED Monitor Light',
        description: 'Eye-care monitor light with wireless controller for focused work sessions.',
        price: '$125',
        rating: 4.7,
        reviews: 21671,
        badge: 'Popular',
        image: product1,
    },
    {
        title: 'Honeywell Newly Launched 4-in-1 Ultra Slim USB Hub',
        description: 'Slim USB hub with multiple ports for high-speed data and charging.',
        price: '$125',
        rating: 4.7,
        reviews: 21671,
        badge: 'Top Pick',
        image: product2,
    },
    {
        title: 'STRIFF Adjustable Laptop Tablet Stand',
        description: 'Sturdy foldable stand for better posture and improved airflow.',
        price: '$125',
        rating: 4.7,
        reviews: 21671,
        badge: 'Best Seller',
        image: product3,
    },
    {
        title: 'Dyazo Water Resistant Laptop Sleeve',
        description: 'Protective laptop sleeve built with water-resistant fabric and soft interior.',
        price: '$125',
        rating: 4.7,
        reviews: 21671,
        badge: 'New',
        image: product1,
    },
]


const WishlistPage = () => {
    const router = useRouter();
    return (
        <div className="container mx-auto py-8 md:py-10 p-4 min-h-screen">
            <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center gap-3 text-title cursor-pointer"
            >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white transition hover:bg-slate-50">
                    <ChevronLeft className="h-5 w-5" />
                </span>
                <span className="text-3xl md:text-4xl text-title font-semibold">Wishlist</span>
            </button>

            <div className='grid grid-cols-2 gap-4 lg:grid-cols-4 mt-8 md:mt-10'>
                {wishlistProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    )
}

export default WishlistPage
