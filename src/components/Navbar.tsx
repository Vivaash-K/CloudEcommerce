import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingCart, Heart, User2, Menu as MenuIcon, Sun, Moon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { MiniCart } from './MiniCart';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    cart,
    wishlist,
    searchQuery,
    setSearchQuery,
    darkMode,
    toggleDarkMode,
    selectedCategory,
    setSelectedCategory,
    setSelectedSubCategory,
    setShowMiniCart,
  } = useStore();

  // Calculate total quantity of items in cart
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-lg relative z-50`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubCategory(null);
              }}
            >
              <MenuIcon className={`h-8 w-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <span className={`ml-2 text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>ShopHub</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 mx-8">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-300 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:text-indigo-600 transition-colors"
            >
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            
            <Link to="/wishlist" className="p-2 hover:text-indigo-600 relative">
              <Heart className="h-6 w-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setShowMiniCart(true)}
              onMouseLeave={() => setShowMiniCart(false)}
            >
              <Link to="/cart" className="p-2 hover:text-indigo-600 relative">
                <ShoppingCart className="h-6 w-6" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs min-w-[1rem] h-4 flex items-center justify-center px-1">
                    {totalCartItems}
                  </span>
                )}
              </Link>
              <MiniCart />
            </div>
            <Link to="/profile" className="p-2 hover:text-indigo-600">
              <User2 className="h-6 w-6" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:text-indigo-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
