import React, { useState, useEffect } from 'react';
import { Filter, Grid3X3, LayoutList, Search } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { products as allProducts } from '../data/products';

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique categories
  const categories = Array.from(new Set(allProducts.map(product => product.category)));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredProducts(allProducts);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter and sort products
    let updatedProducts = [...allProducts];

    // Apply category filter
    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(product => 
        product.category === selectedCategory
      );
    }

    // Apply search filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      updatedProducts = updatedProducts.filter(product => 
        product.name.toLowerCase().includes(searchTermLower) || 
        product.description.toLowerCase().includes(searchTermLower)
      );
    }

    // Apply sorting
    if (sortBy) {
      switch (sortBy) {
        case 'priceAsc':
          updatedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceDesc':
          updatedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'nameAsc':
          updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'nameDesc':
          updatedProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'rating':
          updatedProducts.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">All Products</h1>

        <div className="flex flex-col sm:flex-row w-full md:w-auto space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 md:hidden"
            >
              <Filter className="h-5 w-5 mr-1" />
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Sort By</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="nameAsc">Name: A to Z</option>
              <option value="nameDesc">Name: Z to A</option>
              <option value="rating">Top Rated</option>
            </select>

            <div className="hidden sm:flex space-x-1 border border-gray-300 rounded-md overflow-hidden">
              <button className="p-2 bg-blue-600 text-white">
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button className="p-2 bg-white hover:bg-gray-50">
                <LayoutList className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 pr-6">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="all"
                  name="category"
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="all" className="ml-2 text-gray-700">
                  All Categories
                </label>
              </div>

              {categories.map(category => (
                <div key={category} className="flex items-center">
                  <input
                    type="radio"
                    id={category}
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={category} className="ml-2 text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters - Mobile */}
        {isFilterOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white h-full w-3/4 p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <h4 className="font-semibold mb-2">Categories</h4>
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all-mobile"
                    name="category-mobile"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="all-mobile" className="ml-2 text-gray-700">
                    All Categories
                  </label>
                </div>

                {categories.map(category => (
                  <div key={`${category}-mobile`} className="flex items-center">
                    <input
                      type="radio"
                      id={`${category}-mobile`}
                      name="category-mobile"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`${category}-mobile`} className="ml-2 text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <h4 className="font-semibold mb-2">Price Range</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Min"
                    className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="text"
                    placeholder="Max"
                    className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                  />
                </div>
                <button className="bg-blue-600 text-white w-full py-2 rounded-md mt-2 hover:bg-blue-700 transition-colors">
                  Apply
                </button>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <button 
                onClick={() => setIsFilterOpen(false)}
                className="bg-blue-600 text-white w-full py-3 rounded-md mt-4 hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;