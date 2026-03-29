'use client'
import React, { useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, Repeat2, Share2, ShoppingCart, Star} from 'lucide-react'
import { Button } from '@/components/ui/button'
import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import product3 from '@/assets/home/product3.png'
import hero2 from '@/assets/home/hero2.png'
import hero3 from '@/assets/home/hero3.png'
import arrivals4 from '@/assets/home/arrivals4.png'
import payment from '@/assets/home/payment.png'
import masterCard from '@/assets/home/Master card.png'

const productGallery: StaticImageData[] = [
  product1,
  product2,
  product3,
  hero2,
  hero3,
  arrivals4
]

const colorOptions = ['#E0B75A', '#104D8A']

const ProductDetails = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(colorOptions[0])
  const [selectedSize, setSelectedSize] = useState('14-inch Liquid Retina XDR display')
  const [selectedMemory, setSelectedMemory] = useState('16GB unified memory')
  const [selectedStorage, setSelectedStorage] = useState('1TV SSD Storage')

  const activeImage = productGallery[activeImageIndex]

  const goNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % productGallery.length)
  }

  const goPrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + productGallery.length) % productGallery.length)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  return (
    <section className=" px-4 py-7 md:py-10">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div>
            <div className="relative rounded-md border border-slate-200 bg-white p-4 sm:p-6">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm bg-white">
                <Image
                  src={activeImage}
                  alt="Product preview"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={goPrevImage}
                className="grid size-7 place-items-center rounded-full bg-heading text-white transition hover:brightness-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-4" />
              </button>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {productGallery.map((image, index) => (
                  <button
                    key={`thumb-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative h-12 w-16 shrink-0 overflow-hidden rounded border bg-white p-1 sm:h-14 sm:w-20 ${
                      activeImageIndex === index ? 'border-title' : 'border-slate-200'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={goNextImage}
                className="grid size-7 place-items-center rounded-full bg-heading text-white transition hover:brightness-110"
                aria-label="Next image"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div>
            <div className="mb-1 flex flex-wrap items-center gap-1.5 text-[13px] text-description">
              <div className="flex items-center gap-0.5 text-yellow-400">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={`rating-star-${i}`} className="size-3.5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-title">4.7</span>
              <span>Star Rating</span>
              <span className="text-slate-400">(21,671 User feedback)</span>
            </div>

            <h1 className="text-[26px] leading-[1.2] font-extrabold text-title md:text-[34px]">
              2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray
            </h1>

            <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-description sm:grid-cols-2">
              <p>
                Sku: <span className="text-title">A264671</span>
              </p>
              <p>
                Availability: <span className="font-semibold text-green-600">In Stock</span>
              </p>
              <p>
                Brand: <span className="text-title">Apple</span>
              </p>
              <p>
                Category: <span className="text-title">Electronics Devices</span>
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <span className="text-4xl font-extrabold text-green-600">Rs 125000</span>
              <span className="text-xl text-slate-400 line-through">৳156000</span>
              <span className="rounded bg-yellow-300 px-2 py-1 text-xs font-bold text-black">21% OFF</span>
            </div>

            <p className="mt-2 text-sm text-description">
              or
              <span className="ml-1 font-semibold text-green-600">Get it for Rs 90,000</span>
            </p>

            <div className="my-5 h-px w-full bg-slate-200" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="">
                <p className="mb-2 text-sm font-semibold text-title">Color</p>
                <div className="flex items-center gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`grid size-8 place-items-center rounded-full border ${
                        selectedColor === color ? 'border-title' : 'border-slate-300'
                      }`}
                      aria-label={`Select color ${color}`}
                    >
                      <span className="size-6 rounded-full" style={{ backgroundColor: color }} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-title">Memory</p>
                <select
                  value={selectedMemory}
                  onChange={(event) => setSelectedMemory(event.target.value)}
                  className="h-10 w-full rounded border border-slate-200 bg-slate-50 px-3 text-sm text-title outline-none"
                >
                  <option>16GB unified memory</option>
                  <option>8GB unified memory</option>
                  <option>32GB unified memory</option>
                </select>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-title">Storage</p>
                <select
                  value={selectedStorage}
                  onChange={(event) => setSelectedStorage(event.target.value)}
                  className="h-10 w-full rounded border border-slate-200 bg-slate-50 px-3 text-sm text-title outline-none"
                >
                  <option>1TV SSD Storage</option>
                  <option>512GB SSD Storage</option>
                  <option>256GB SSD Storage</option>
                </select>
              </div>

              <div className="">
                <p className="mb-2 text-sm font-semibold text-title">Size</p>
                <select
                  value={selectedSize}
                  onChange={(event) => setSelectedSize(event.target.value)}
                  className="h-10 w-full rounded border border-slate-200 bg-slate-50 px-3 text-sm text-title outline-none"
                >
                  <option>14-inch Liquid Retina XDR display</option>
                  <option>13-inch Liquid Retina display</option>
                  <option>16-inch Liquid Retina XDR display</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex h-11 items-center gap-4 rounded-full border border-slate-300 px-4">
                <button type="button" onClick={decreaseQuantity} aria-label="Decrease quantity">
                  <Minus className="size-4 text-description" />
                </button>
                <span className="min-w-6 text-center text-sm font-semibold text-title">{quantity}</span>
                <button type="button" onClick={increaseQuantity} aria-label="Increase quantity">
                  <Plus className="size-4 text-description" />
                </button>
              </div>

              <Button type="button" className="h-11 rounded-full px-8 text-sm font-bold uppercase">
                GET DEAL ( ৳90K )
              </Button>

              <button
                type="button"
                className="inline-flex h-11 items-center cursor-pointer gap-2 rounded-full border-2 border-main px-6 text-sm font-semibold text-main transition hover:bg-main/5"
              >
                <ShoppingCart className="size-4" />
                ADD
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-description">
              <button type="button" className="inline-flex items-center gap-1.5 hover:text-title">
                <Heart className="size-4" />
                Add to Wishlist
              </button>
              <button type="button" className="inline-flex items-center gap-1.5 hover:text-title">
                <Repeat2 className="size-4" />
                Add to Compare
              </button>
              <button type="button" className="inline-flex items-center gap-1.5 hover:text-title">
                <Share2 className="size-4" />
                Share product
              </button>
            </div>

            <div className="mt-6 rounded border border-slate-200 bg-white px-3 py-3">
              <p className="mb-2 text-sm text-title">100% Guarantee Safe Checkout</p>
              <div className="flex flex-wrap items-center gap-3">
                <Image src={payment} alt="Payment methods" className="h-4 w-auto" />
                <Image src={masterCard} alt="Master card" className="h-5 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
