import React, { useEffect, useState } from "react";
import { ShoppingCart, CircleUserRound, Menu, X, Search, Heart, Package } from 'lucide-react';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";



function navbar() {

  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-black mr-8">ShopDash</Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-black hover:underline transition-colors">Home</Link>
              <Link to="/products" className="text-black hover:underline transition-colors">Products</Link>
              <Link to="/" className="text-black hover:underline transition-colors">Deals</Link>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="py-2 pl-10 pr-4 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <Link to="/wishlist" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Heart className="h-6 w-6" />
            </Link>
            
            <Link to="/cart" className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            </div>
            </div>
            </div>
            </header>
      </div>
    </>
  );
}

export default navbar;
