import React from 'react';
import { useStore } from '../store/useStore';

const TermsOfService: React.FC = () => {
  const { darkMode } = useStore();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className={`rounded-lg shadow-md p-8 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              By accessing or using ShopHub, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              <p className="mb-2">When you create an account with us, you must provide accurate information and:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Maintain the security of your account</li>
                <li>Promptly update any changes to your information</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Not share your account credentials</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Products and Services</h2>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              <p className="mb-4">
                All products and services are subject to availability. We reserve the right to 
                discontinue any product or service at any time. Prices for our products are 
                subject to change without notice.
              </p>
              <p className="mb-4">
                We have made every effort to display as accurately as possible the colors and 
                images of our products. We cannot guarantee that your computer monitor's display 
                of any color will be accurate.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Ordering and Payment</h2>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              <p className="mb-2">By placing an order, you agree to:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Provide current, complete, and accurate purchase information</li>
                <li>Promptly update your account and payment information</li>
                <li>Pay all charges at the prices in effect when incurring the charges</li>
                <li>Pay any applicable taxes and shipping charges</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping and Delivery</h2>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              We will make our best efforts to deliver products within the estimated delivery 
              timeframe. However, we are not responsible for delivery delays beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Returns and Refunds</h2>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              <p className="mb-2">Our return policy allows you to return items within 30 days if:</p>
              <ul className="list-disc list-inside mb-4">
                <li>The item is unused and in original condition</li>
                <li>Original packaging is intact</li>
                <li>You have proof of purchase</li>
                <li>The item is not final sale or clearance</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              The service and its original content, features, and functionality are owned by 
              ShopHub and are protected by international copyright, trademark, patent, trade 
              secret, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              <p className="mb-2">You agree not to use the service:</p>
              <ul className="list-disc list-inside mb-4">
                <li>For any unlawful purpose</li>
                <li>To harass, abuse, or harm others</li>
                <li>To submit false or misleading information</li>
                <li>To impersonate or attempt to impersonate others</li>
                <li>To interfere with the proper working of the service</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              We may terminate or suspend your account and bar access to the service immediately, 
              without prior notice or liability, under our sole discretion, for any reason 
              whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              We reserve the right to modify or replace these Terms at any time. We will provide 
              notice of any changes by posting the new Terms on this page and updating the 
              "Last Updated" date.
            </p>
          </section>

          <div className={`mt-8 pt-4 border-t ${
            darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'
          }`}>
            <p>Last Updated: February 15, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 