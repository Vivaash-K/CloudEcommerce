import React from 'react';
import { useStore } from '../store/useStore';

const About: React.FC = () => {
  const { darkMode } = useStore();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className={`rounded-lg shadow-md p-8 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <h1 className="text-3xl font-bold mb-6">About ShopHub</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Founded in 2024, ShopHub has grown from a small startup to a leading e-commerce platform. 
            We're dedicated to providing our customers with the best shopping experience possible, 
            offering a wide range of high-quality products at competitive prices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            At ShopHub, our mission is to revolutionize online shopping by creating a seamless, 
            secure, and enjoyable experience for our customers. We believe in:
          </p>
          <ul className={`list-disc list-inside mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>Quality products at fair prices</li>
            <li>Exceptional customer service</li>
            <li>Secure and convenient shopping</li>
            <li>Fast and reliable delivery</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Browse through thousands of products across multiple categories.
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Shop with confidence using our secure payment systems.
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Quick and reliable shipping to your doorstep.
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Our customer service team is always here to help.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            We're a diverse team of professionals passionate about e-commerce and customer satisfaction. 
            Our team brings together expertise in technology, retail, and customer service to create 
            the best possible shopping experience for our users.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About; 