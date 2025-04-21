import React, { useEffect, useState } from "react";
import { ShoppingCart, CircleUserRound, Menu, X, Search, Heart, Package, User } from 'lucide-react';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function Navbar() {
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
                <Link to="/" className="text-xl font-bold text-black mr-8">EcomDash</Link>
                <nav className="hidden md:flex space-x-6">
                  <Link to="/" className="text-black hover:underline hover:scale-110 ">Home</Link>
                  <Link to="/products" className="text-black hover:underline hover:scale-110">Products</Link>
                </nav>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="py-2 pl-10 pr-4 w-64 rounded-full border text-black border-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
                </div>

                <Link to="/wishlist" className="p-2 text-black hover:scale-110 ">
                  <Heart className="h-6 w-6" />
                </Link>

                <Link to="/cart" className="p-2 text-black hover:scale-110  relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center focus:outline-none"
                    >
                      <img src={user?.avatar} alt={user?.name} 
                        className="h-8 w-8 rounded-full object-cover border-2 border-blue-600"
                      />
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Profile
                        </Link>
                        <button onClick={logout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login"  className="flex items-center text-black hover:scale-110 ">
                    <User className="h-6 w-6 mr-1" />
                    <span>Login</span>
                  </Link>
                )}
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-black focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4 absolute top-full left-0 right-0">
          <div className="flex items-center mb-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="py-2 pl-10 pr-4 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-7 top-6.5 h-5 w-5 text-gray-400" />
          </div>
          
          <nav className="space-y-3">
            <Link to="/" className="block text-gray-700 hover:text-blue-600 ">Home</Link>
            <Link to="/products" className="block text-gray-700 hover:text-blue-600 ">Products</Link>
          </nav>
          
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
            <Link to="/wishlist" className="flex items-center text-gray-700 hover:text-blue-600">
              <Heart className="h-5 w-5 mr-1" />
              <span>Wishlist</span>
            </Link>
            
            <Link to="/cart" className="flex items-center text-gray-700 hover:text-blue-600  relative">
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="ml-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          
          {isAuthenticated ? (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center mb-4">
                <img 
                  src={user?.avatar} 
                  alt={user?.name} 
                  className="h-10 w-10 rounded-full object-cover border-2 border-blue-600 mr-3"
                />
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link href="/profile" className="block text-gray-700 hover:text-blue-600">
                  Profile
                </Link>
                <button onClick={logout} className="block w-full text-left text-gray-700 hover:text-blue-600">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link tp="/login" className="block text-center py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}
        </header>
      </div>
    </>
  );
}

export default Navbar;
