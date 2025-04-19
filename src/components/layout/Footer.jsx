import React from 'react'
import { Mail, Copyright} from 'lucide-react';

function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EcomDash</h3>
            <p className="text-gray-400 mb-4 text-md">Your one-stop destination for all your shopping needs. Quality products, competitive prices, and excellent customer service.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">All Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Featured Items</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New Arrivals</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-blue-400" />
                <span className="text-gray-400">support@ecomdash.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-start items-center gap-2">
          <Copyright size={22} className='text-gray-400'/>
          <p className="text-gray-400 text-sm">2025 EcomDash. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>

  )
}

export default Footer