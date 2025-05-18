import React from 'react';
import { useStore } from '../store/useStore';
import { mockProducts } from '../data/products';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

export const MiniCart: React.FC = () => {
  const { darkMode, cart, showMiniCart, setShowMiniCart, removeFromCart, updateCartQuantity } = useStore();

  if (!showMiniCart) return null;

  const cartItems = cart.map((item) => ({
    ...item,
    product: mockProducts.find((p) => p.id === item.productId)!,
  }));

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const savings = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.product.originalPrice
        ? (item.product.originalPrice - item.product.price) * item.quantity
        : 0),
    0
  );

  return (
    <div
      className={`absolute top-16 right-4 w-96 z-50 rounded-lg shadow-xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Shopping Cart ({cartItems.length})
          </h3>
          <button
            onClick={() => setShowMiniCart(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-auto">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
          >
            <div className="flex gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.product.name}
                </h4>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                      className={`px-2 rounded ${
                        darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'
                      }`}
                    >
                      -
                    </button>
                    <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                      className={`px-2 rounded ${
                        darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'
                      }`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 0 ? (
        <div className="p-4 space-y-4">
          {savings > 0 && (
            <p className="text-green-500 text-sm">You save: ${savings.toFixed(2)}</p>
          )}
          <div className="flex justify-between font-medium">
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>Total:</span>
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>
              ${total.toFixed(2)}
            </span>
          </div>
          <Link
            to="/cart"
            onClick={() => setShowMiniCart(false)}
            className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            View Cart
          </Link>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">Your cart is empty</div>
      )}
    </div>
  );
}; 