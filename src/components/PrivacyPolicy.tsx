import React from 'react';
import { useStore } from '../store/useStore';

const PrivacyPolicy: React.FC = () => {
  const { darkMode } = useStore();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className={`rounded-lg shadow-md p-8 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              At ShopHub, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website or make a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              <p className="mb-2">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Name and contact information</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Purchase history</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              <p className="mb-2">We use the information we collect to:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Process your orders and payments</li>
                <li>Communicate with you about your orders</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              We do not sell or rent your personal information to third parties. We may share your 
              information with service providers who assist us in operating our website, conducting 
              our business, or serving our users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              We implement appropriate technical and organizational measures to maintain the security 
              of your personal information. However, no method of transmission over the Internet is 
              100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to our use of your information</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              We use cookies and similar tracking technologies to track activity on our website and 
              hold certain information. You can instruct your browser to refuse all cookies or to 
              indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@shophub.com
              <br />
              Phone: +1 (555) 123-4567
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

export default PrivacyPolicy; 