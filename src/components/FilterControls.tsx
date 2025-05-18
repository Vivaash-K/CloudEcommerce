import React from 'react';
import { useStore } from '../store/useStore';
import { FaStar } from 'react-icons/fa';

export const FilterControls: React.FC = () => {
  const { darkMode, priceRange, setPriceRange, minRating, setMinRating } = useStore();

  return (
    <div className={`space-y-6 p-6 rounded-xl backdrop-blur-sm ${
      darkMode ? 'bg-gray-800/70' : 'bg-white/70'
    } shadow-lg ring-1 ring-gray-900/5`}>
      <div>
        <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Price Range
        </h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className={`block text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Min Price</label>
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              className={`w-full px-3 py-2 rounded-lg transition-shadow duration-200 ${
                darkMode
                  ? 'bg-gray-700/50 border-gray-600 text-white'
                  : 'bg-white/50 border-gray-300 text-gray-700'
              } border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              placeholder="Min"
              min={0}
            />
          </div>
          <div className="flex-1">
            <label className={`block text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Max Price</label>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className={`w-full px-3 py-2 rounded-lg transition-shadow duration-200 ${
                darkMode
                  ? 'bg-gray-700/50 border-gray-600 text-white'
                  : 'bg-white/50 border-gray-300 text-gray-700'
              } border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              placeholder="Max"
              min={0}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Minimum Rating
        </h3>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating === minRating ? 0 : rating)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                rating <= minRating
                  ? 'bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/30'
                  : darkMode
                  ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50'
              }`}
            >
              <FaStar className={rating <= minRating ? 'text-gray-900' : 'text-yellow-400'} />
              {rating}+
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 