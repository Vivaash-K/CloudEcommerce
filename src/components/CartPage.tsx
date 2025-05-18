import React from 'react';
import { useStore } from '../store/useStore';
import { mockProducts } from '../data/products';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const { cart, darkMode } = useStore();
  const navigate = useNavigate();
  const cartProducts = cart.map(item => ({
    product: mockProducts.find(p => p.id === item.productId)!,
    quantity: item.quantity
  }));

  const total = cartProducts.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  const { removeFromCart } = useStore();

  const handleCheckout = () => {
    console.log('Checkout button clicked');
    // Navigate to the payment gateway
    window.open('http://localhost:3000/payment', '_blank');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Shopping Cart ({cartProducts.length} items)
        </h1>
        
        {cartProducts.length === 0 ? (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-xl">Your cart is empty</p>
            <p className="mt-2">Add items to your cart to get started</p>
            <Link 
              to="/" 
              className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartProducts.map(({ product, quantity }) => (
                <div 
                  key={product.id} 
                  className={`${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } rounded-lg shadow-md p-4 flex items-center gap-4`}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="p-1 hover:text-indigo-600">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span>{quantity}</span>
                      <button className="p-1 hover:text-indigo-600">
                        <Plus className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => removeFromCart(product.id)}
                        className="p-1 hover:text-red-600 ml-4"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-lg font-semibold">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg shadow-md p-6 h-fit`}>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-4 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};