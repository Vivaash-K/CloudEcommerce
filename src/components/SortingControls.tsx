import React from 'react';
import { useStore } from '../store/useStore';
import { FaSort, FaSortAmountDown, FaSortAmountUp, FaStar } from 'react-icons/fa';

export const SortingControls: React.FC = () => {
  const { sortBy, setSortBy, darkMode } = useStore();

  const options = [
    { value: 'price_asc', label: 'Price: Low to High', icon: <FaSortAmountUp /> },
    { value: 'price_desc', label: 'Price: High to Low', icon: <FaSortAmountDown /> },
    { value: 'rating', label: 'Highest Rated', icon: <FaStar /> },
    { value: 'popularity', label: 'Most Popular', icon: <FaSort /> },
  ] as const;

  return (
    <div className={`p-4 rounded-xl backdrop-blur-sm ${
      darkMode ? 'bg-gray-800/70' : 'bg-white/70'
    } shadow-lg ring-1 ring-gray-900/5`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Sort by:
        </span>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(sortBy === option.value ? null : option.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                sortBy === option.value
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : darkMode
                  ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50'
              }`}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 