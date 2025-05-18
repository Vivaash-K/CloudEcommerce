import React from 'react';
import { useStore } from '../store/useStore';
import { mockProducts } from '../data/products';

export const CategoryFilter: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    darkMode,
  } = useStore();

  // Extract unique categories from products
  const categories = Array.from(new Set(mockProducts.map(p => p.category)));

  // Extract subcategories for the selected category
  const subCategories = selectedCategory
    ? Array.from(
        new Set(
          mockProducts
            .filter(p => p.category === selectedCategory)
            .map(p => p.subCategory)
        )
      )
    : [];

  const handleCategoryClick = (category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    } else {
      setSelectedCategory(category);
      setSelectedSubCategory(null);
    }
  };

  const handleSubCategoryClick = (subCategory: string) => {
    if (subCategory === selectedSubCategory) {
      setSelectedSubCategory(null);
    } else {
      setSelectedSubCategory(subCategory);
    }
  };

  return (
    <div className={`h-full w-64 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-md p-4`}>
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      {!selectedCategory ? (
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category}>
              <button
                className={`w-full text-left py-2 px-3 rounded ${
                  category === selectedCategory
                    ? 'bg-indigo-600 text-white'
                    : darkMode
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-200'
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-4">
          <button
            className={`w-full text-left py-2 px-3 rounded ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
            }`}
            onClick={() => handleCategoryClick(selectedCategory)}
          >
            ← Back to Categories
          </button>
          <h3 className="text-lg font-semibold">{selectedCategory}</h3>
          <ul className="space-y-2">
            {subCategories.map(subCategory => (
              <li key={subCategory}>
                <button
                  className={`w-full text-left py-2 px-3 rounded ${
                    subCategory === selectedSubCategory
                      ? 'bg-indigo-500 text-white'
                      : darkMode
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleSubCategoryClick(subCategory)}
                >
                  {subCategory}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
