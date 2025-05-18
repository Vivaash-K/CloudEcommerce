import React from 'react';
import { useStore } from '../store/useStore';
import { mockProducts } from '../data/products';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Wishlist: React.FC = () => {
  const { darkMode, wishlist, toggleWishlist } = useStore();

  const wishlistItems = mockProducts.filter(product => wishlist.includes(product.id));

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="mb-4">Your wishlist is empty</p>
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className={`relative p-4 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              <Link to={`/product/${item.id}`} className="block">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold mb-2">{item.name}</h3>
                <p className="text-lg font-bold">${item.price}</p>
              </Link>
              <button
                onClick={() => toggleWishlist(item.id)}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  darkMode
                    ? 'bg-gray-600 hover:bg-gray-500'
                    : 'bg-white hover:bg-gray-200'
                }`}
              >
                <FaTrash className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 