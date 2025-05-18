import React from 'react';
import { useStore } from '../store/useStore';
import { FaStar, FaStarHalf, FaTimes } from 'react-icons/fa';

export const QuickViewModal: React.FC = () => {
  const { darkMode, quickViewProduct, setQuickViewProduct, addToCart } = useStore();

  if (!quickViewProduct) return null;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half" className="text-yellow-400" />);
    }

    return stars;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className={`relative w-full max-w-2xl rounded-lg shadow-xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-2 gap-8 p-6">
          <div>
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          <div className="space-y-4">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {quickViewProduct.name}
            </h2>

            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(quickViewProduct.rating)}
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                ({quickViewProduct.reviews} reviews)
              </span>
            </div>

            <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ${quickViewProduct.price}
              {quickViewProduct.originalPrice && (
                <span className={`ml-2 text-sm line-through ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  ${quickViewProduct.originalPrice}
                </span>
              )}
            </p>

            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {quickViewProduct.description}
            </p>

            <button
              onClick={() => {
                addToCart(quickViewProduct);
                setQuickViewProduct(null);
              }}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 