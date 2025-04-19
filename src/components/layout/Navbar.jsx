import React from "react";
import { ShoppingCart, CircleUserRound, Menu, X, Search, Heart, Package } from 'lucide-react';
import { Link } from "react-router-dom";


function navbar() {
  return (
    <>
      <div>
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white shadow-md">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold text-blue-300">EcomDash</Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              <Link to="#" className="text-gray-700 hover:text-gray-900">Products</Link>
              <Link to="#" className="text-gray-700 hover:text-gray-900">About</Link>
              <Link to="#" className="text-gray-700 hover:text-gray-900">Contact</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Heart size={20} />
            <ShoppingCart size={20} />
            <CircleUserRound size={28} />
          </div>
          <div className="md:hidden flex items-center">
            <Menu size={24} />
          </div>
        </nav>
      </div>
    </>
  );
}

export default navbar;
