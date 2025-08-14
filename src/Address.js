import React, { useState } from 'react';

const Address = ({ onClose, onSubmit, cartItems, subtotal, deliveryCharge, total }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !mobile) {
      alert('Please fill in all fields.');
      return;
    }
    // Validate mobile number (basic check for 10 digits)
    if (!/^\d{10}$/.test(mobile)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Store user details in localStorage
    const userDetails = { name, address, mobile };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    // Proceed to payment
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">Enter Your Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your delivery address"
              rows="4"
              required
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your 10-digit mobile number"
              pattern="\d{10}"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;