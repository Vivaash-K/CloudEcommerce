import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { SortingControls } from './SortingControls';
import { FilterControls } from './FilterControls';
import { RecentlyViewed } from './RecentlyViewed';
import { QuickViewModal } from './QuickViewModal';

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const {
    searchQuery,
    darkMode,
    selectedCategory,
    selectedSubCategory,
    sortBy,
    priceRange,
    minRating,
    addToRecentlyViewed,
  } = useStore();

  // Filter products based on all criteria
  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.subCategory?.toLowerCase() || '').includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSubCategory = selectedSubCategory ? product.subCategory === selectedSubCategory : true;
    const matchesPriceRange = product.price >= priceRange.min && product.price <= priceRange.max;
    const matchesRating = product.rating >= minRating;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesSubCategory &&
      matchesPriceRange &&
      matchesRating
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return b.popularity - a.popularity;
      default:
        return b.popularity - a.popularity; // Default sort by popularity
    }
  });

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : ''}`}>
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <SortingControls />
          <FilterControls />
        </div>
        
        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing {sortedProducts.length} products
        </p>

        {sortedProducts.length === 0 ? (
          <div className={`text-center py-16 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm shadow-lg ring-1 ring-gray-900/5`}>
            <p className={`text-xl font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No products found
            </p>
            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => addToRecentlyViewed(product)}
                className="transform transition-transform duration-200 hover:scale-[1.02]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <RecentlyViewed />
      <QuickViewModal />
    </div>
  );
};
