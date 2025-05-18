import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../store/useStore';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const { darkMode } = useStore();

  if (!user) {
    return (
      <div className={`text-center p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Please log in to view your profile
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className={`rounded-lg shadow-md p-6 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            My Profile
          </h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="mb-6">
          <h2 className={`text-xl font-semibold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Personal Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Name</p>
              <p className={`font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {user.name}
              </p>
            </div>
            <div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Email</p>
              <p className={`font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className={`text-xl font-semibold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Purchase History
          </h2>
          {user.purchaseHistory.length === 0 ? (
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              No purchase history yet
            </p>
          ) : (
            <div className="space-y-4">
              {user.purchaseHistory.map((purchase) => (
                <div key={purchase.orderId} className={`border rounded-lg p-4 ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <p className={`font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Order #{purchase.orderId}
                    </p>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {new Date(purchase.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className={`font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Items:
                    </p>
                    <ul className="list-disc list-inside">
                      {purchase.items.map((item, index) => (
                        <li key={index} className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {item.name} - {item.quantity} x ${item.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className={`font-medium text-right ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Total: ${purchase.totalAmount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 