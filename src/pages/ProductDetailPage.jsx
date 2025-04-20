import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Heart, Minus, Plus, ShoppingCart, Star, Truck } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { Button } from '@radix-ui/themes';


const ProductDetailPage = ({ productId = '1' }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const product = products.find(p => p.id === productId);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== productId).slice(0, 4);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!product && !isLoading) {
    return (
        <div className="container mx-auto px-4 py-16 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button variant="primary" onClick={() => window.location.href = '/products'}>
              Back to Products
            </Button>
          </div>
        </div>
    );
  }

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <div className="bg-gray-200 animate-pulse h-96 w-full rounded-lg"></div>
            </div>
            <div className="md:w-1/2">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
                </div>
                <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src={product?.image} 
                alt={product?.name} 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product?.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center text-amber-500 mr-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product?.rating || 0) ? 'fill-amber-500' : 'fill-gray-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">{product?.rating} Rating</span>
              </div>
              
              <div className="text-2xl font-bold text-blue-700 mb-6">
                Rs. {product?.price.toFixed(2)}
              </div>
              
              <p className="text-gray-600 mb-6">
                {product?.description}
              </p>
              
              <div className="mb-6">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <div className={`w-3 h-3 rounded-full mr-2 ${product?.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>{product?.stock > 0 ? `In Stock (${product?.stock} available)` : 'Out of Stock'}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="h-4 w-4 mr-2" />
                  <span>Free shipping on orders over $50</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product?.stock || 10, quantity + 1))}
                    disabled={quantity >= (product?.stock || 10)}
                    className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => product && addToCart(product.id, quantity)}
                  leftIcon={<ShoppingCart className="h-5 w-5" />}
                  disabled={!product?.stock}
                >
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <button
                      className={`flex justify-between items-center w-full p-4 text-left font-medium ${
                        activeTab === 'description' ? 'bg-gray-50' : 'bg-white'
                      }`}
                      onClick={() => setActiveTab(activeTab === 'description' ? '' : 'description')}
                    >
                      <span>Description</span>
                      {activeTab === 'description' ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    {activeTab === 'description' && (
                      <div className="p-4 text-gray-600">
                        <p>{product?.description}</p>
                        <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <button
                      className={`flex justify-between items-center w-full p-4 text-left font-medium ${
                        activeTab === 'details' ? 'bg-gray-50' : 'bg-white'
                      }`}
                      onClick={() => setActiveTab(activeTab === 'details' ? '' : 'details')}
                    >
                      <span>Product Details</span>
                      {activeTab === 'details' ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    {activeTab === 'details' && (
                      <div className="p-4 text-gray-600">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Category: {product?.category}</li>
                          <li>Rating: {product?.rating} out of 5</li>
                          <li>Stock: {product?.stock} units</li>
                          <li>Product ID: {product?.id}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <button
                      className={`flex justify-between items-center w-full p-4 text-left font-medium ${
                        activeTab === 'shipping' ? 'bg-gray-50' : 'bg-white'
                      }`}
                      onClick={() => setActiveTab(activeTab === 'shipping' ? '' : 'shipping')}
                    >
                      <span>Shipping & Returns</span>
                      {activeTab === 'shipping' ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    {activeTab === 'shipping' && (
                      <div className="p-4 text-gray-600">
                        <p>Free standard shipping on orders over $50. Expedited shipping options available at checkout.</p>
                        <p className="mt-2">Returns accepted within 30 days of delivery for items in original condition.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <ProductGrid products={relatedProducts} isLoading={isLoading} />
        </div>
      </div>
  );
};

export default ProductDetailPage;