import { useState } from 'react';

const Header = ({ cartItems, user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🍟</div>
          <div>
            <h1 className="text-xl font-bold">Hot Chips</h1>
            <p className="text-xs opacity-90">Fresh & Crispy</p>
          </div>
        </div>

        {/* User Menu */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-3 py-2 hover:bg-opacity-30 transition-colors"
            >
              <div className="w-6 h-6 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="text-sm hidden sm:inline">{user.name}</span>
              <svg 
                className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm text-gray-800 font-medium">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Welcome message and cart info */}
      {user && (
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="opacity-90">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </span>
          {totalItems > 0 && (
            <div className="flex items-center space-x-1 bg-white bg-opacity-20 rounded-full px-2 py-1">
              <span>🛒</span>
              <span>{totalItems} items</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;