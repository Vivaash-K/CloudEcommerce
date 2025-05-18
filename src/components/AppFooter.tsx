import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const AppFooter: React.FC = () => {
  const { darkMode } = useStore();

  return (
    <footer className={`mt-12 py-8 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About ShopHub</h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your one-stop destination for all your shopping needs. Quality products, 
              great prices, and excellent service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className={`hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/category" 
                  className={`hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Shop by Category
                </Link>
              </li>
              <li>
                <Link 
                  to="/wishlist" 
                  className={`hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/terms-of-service" 
                  className={`hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  className={`hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:support@shophub.com" 
                  className={`hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Email Support
                </a>
              </li>
              <li>
                <a 
                  href="tel:+15551234567" 
                  className={`hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Call Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="space-y-4">
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Follow us on social media:
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com/shophub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`hover:text-blue-500 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Facebook
                </a>
                <a 
                  href="https://twitter.com/shophub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`hover:text-blue-400 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Twitter
                </a>
                <a 
                  href="https://instagram.com/shophub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`hover:text-pink-500 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t ${
          darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-500'
        } text-center`}>
          <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter; 