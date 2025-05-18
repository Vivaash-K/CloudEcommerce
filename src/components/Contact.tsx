import React, { useState } from 'react';
import { useStore } from '../store/useStore';

const Contact: React.FC = () => {
  const { darkMode } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const inputClasses = `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
    darkMode
      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
  }`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className={`rounded-lg shadow-md p-8 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <div className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="mb-4">
                Have a question or feedback? We'd love to hear from you. Fill out the form
                and our team will get back to you as soon as possible.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p>123 ShopHub Street</p>
                  <p>New York, NY 10001</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p>support@shophub.com</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Saturday - Sunday: 10:00 AM - 4:00 PM EST</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-green-800 text-green-100' : 'bg-green-100 text-green-800'
              }`}>
                <h2 className="text-xl font-semibold mb-2">Thank You!</h2>
                <p>Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1" htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1" htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClasses} h-32 resize-none`}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 