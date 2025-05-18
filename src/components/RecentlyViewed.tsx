import React from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export const RecentlyViewed: React.FC = () => {
  const { darkMode, recentlyViewed, setQuickViewProduct } = useStore();

  if (recentlyViewed.length === 0) return null;

  return (
    <div className={`mt-12 ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
      <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Recently Viewed
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recentlyViewed.map((product) => (
          <div
            key={product.id}
            className={`group relative rounded-lg overflow-hidden shadow-sm ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover group-hover:opacity-75 transition-opacity"
              />
            </Link>
            <div className="p-3">
              <h3 className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {product.name}
              </h3>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                ${product.price}
              </p>
              <button
                onClick={() => setQuickViewProduct(product)}
                className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Quick view
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 