import React from 'react';
import { useStore } from '../store/useStore';
import { ProductCard } from './ProductCard';
import { mockProducts } from '../data/products';

export const WishlistPage = () => {
  const { wishlist, darkMode } = useStore();
  const wishlistProducts = mockProducts.filter(product => wishlist.includes(product.id));

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          My Wishlist ({wishlistProducts.length} items)
        </h1>
        {wishlistProducts.length === 0 ? (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-xl">Your wishlist is empty</p>
            <p className="mt-2">Add items to your wishlist by clicking the heart icon on products</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};