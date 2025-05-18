import React from 'react';
import { useStore } from '../store/useStore';
import { mockProducts } from '../data/products';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

export const Cart: React.FC = () => {
  const { darkMode, cart, removeFromCart, updateCartQuantity } = useStore();

  // Join cart items with product details
  const cartItemsWithDetails = cart.map(cartItem => {
    const product = mockProducts.find(p => p.id === cartItem.productId);
    return {
      ...cartItem,
      product
    };
  }).filter(item => item.product); // Filter out any items where product wasn't found

  const calculateTotal = () => {
    return cartItemsWithDetails.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const convertToETH = (usdAmount: number) => {
    // Using a fixed conversion rate of 1 ETH = $2000 for demonstration
    return (usdAmount / 2000).toFixed(6);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const total = calculateTotal();

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItemsWithDetails.length === 0 ? (
        <div className="text-center py-8">
          <p className="mb-4">Your cart is empty</p>
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItemsWithDetails.map((item) => (
              <div
                key={item.productId}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Link to={`/product/${item.productId}`}>
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </Link>
                  <div>
                    <Link 
                      to={`/product/${item.productId}`}
                      className={`font-semibold hover:text-indigo-500 transition-colors ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      {item.product?.name}
                    </Link>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      ${item.product?.price} (≈ {convertToETH(item.product?.price || 0)} ETH)
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className={`p-1 rounded ${
                          darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                        }`}
                      >
                        <FaMinus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className={`p-1 rounded ${
                          darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                        }`}
                      >
                        <FaPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="text-right">
                    <span className="font-bold">
                      ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </span>
                    <br />
                    <span className="text-sm text-gray-500">
                      ≈ {convertToETH((item.product?.price || 0) * item.quantity)} ETH
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <div className="text-right">
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
                <br />
                <span className="text-sm text-gray-500">≈ {convertToETH(total)} ETH</span>
              </div>
            </div>
            <button
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium 
                hover:bg-indigo-700 transition-all duration-200 transform hover:scale-[1.02] 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
                shadow-lg shadow-indigo-500/30"
              onClick={() => window.location.href = "http://localhost:3000/"}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}; 