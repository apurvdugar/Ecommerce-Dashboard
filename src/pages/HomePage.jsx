import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { ArrowRight, TrendingUp, Zap, ShieldCheck } from 'lucide-react';
import ProductGrid from "../components/ProductGrid";
import { Link } from "react-router-dom";

function HomePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        // Split products into featured and new arrivals
        setFeaturedProducts(data.slice(0, 4)); // First 4 products as featured
        setNewArrivals(data.slice(4, 8)); // Next 4 products as new arrivals
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Discover Amazing Products For Your Lifestyle
              </h1>
              <p className="text-lg mb-6 text-blue-100">
                Shop the latest trends with confidence. Quality products, competitive prices, and excellent service.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/products" 
                  className="bg-white text-black hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Shopping Experience"
                className="w-full max-w-md rounded-lg shadow-xl "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Get your products delivered to your doorstep quickly and reliably.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
                <p className="text-gray-600">Shop with confidence with our secure payment methods.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Quality Products</h3>
                <p className="text-gray-600">We ensure all products meet the highest quality standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/products" 
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} isLoading={isLoading} />
        </div>
      </section>
      
      
      {/* New Arrivals */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
            <Link to="/products" 
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <ProductGrid products={newArrivals} isLoading={isLoading} />
        </div>
      </section>
    </>
  );
}

export default HomePage;
