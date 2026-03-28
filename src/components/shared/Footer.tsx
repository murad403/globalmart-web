import React from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { FaFacebook } from 'react-icons/fa'
import { BsTwitter, BsYoutube } from 'react-icons/bs'
import { LiaLinkedin } from 'react-icons/lia'

const Footer = () => {
  return (
    <footer className="w-full bg-title text-white py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 shrink-0 min-w-fit mb-3">
              <div className="bg-heading text-white p-2 rounded-lg font-bold">
                <ShoppingCart />
              </div>
              <span className="text-2xl font-bold">Wobuy</span>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              Marketplace connecting customers, wholesalers, retailers, and businesses. Shop safely with our secure platform.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <FaFacebook size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <BsTwitter size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <LiaLinkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <BsYoutube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">Browse Products</Link></li>
              <li><Link href="#" className="hover:text-white transition">Pricing Plans</Link></li>
              <li><Link href="#" className="hover:text-white transition">Become a Seller</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-300 mb-3">Subscribe for the latest updates and exclusive offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded bg-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:bg-white/20"
              />
            </div>
            <Button className='mt-3'>
              Subscribe
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 pt-8 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-gray-300 mb-4">
            <p>© {new Date().getFullYear()} Wobuy Marketplace. All rights reserved.</p>
            <div className="text-center md:text-right space-x-4">
              <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition">Cookie Policy</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-xs text-gray-400 text-center md:text-left">
            <p>📧 support@wobuy.com | ☎️ +1 (555) 123-4567 | 📍 123 Business Ave, Suite 300</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
