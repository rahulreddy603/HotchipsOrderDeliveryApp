import React from 'react';
import { IndianRupee, Package } from 'lucide-react';

const OrderConfirmation = ({ cartItems, subtotal, deliveryCharge, total, userDetails, onContinueShopping }) => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
        <Package size={24} />
        Order Confirmed!
      </h2>
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Details</h3>
        <p className="text-gray-600">Name: {userDetails.name || 'N/A'}</p>
        <p className="text-gray-600">Address: {userDetails.address || 'N/A'}</p>
        <p className="text-gray-600">Mobile: {userDetails.mobile || 'N/A'}</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h3>
        {cartItems.map(item => (
          <div key={`${item.id}-${item.size}`} className="flex justify-between items-center mb-2">
            <div>
              <p className="text-gray-800">{item.name} ({item.size}) x{item.quantity}</p>
            </div>
            <span className="font-semibold flex items-center gap-1">
              <IndianRupee size={14} />
              {item.price * item.quantity}
            </span>
          </div>
        ))}
        <div className="border-t pt-2 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium flex items-center gap-1">
              <IndianRupee size={16} />
              Subtotal
            </span>
            <span className="font-semibold flex items-center gap-1">
              <IndianRupee size={16} />
              {subtotal}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium flex items-center gap-1">
              <IndianRupee size={16} />
              Delivery Charge
            </span>
            <span className="font-semibold flex items-center gap-1">
              <IndianRupee size={16} />
              {deliveryCharge}
            </span>
          </div>
          <div className="flex justify-between items-center border-t pt-2 mt-2">
            <span className="text-xl font-bold flex items-center gap-1">
              <IndianRupee size={18} />
              Total
            </span>
            <span className="font-bold flex items-center gap-1">
              <IndianRupee size={18} />
              {total}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onContinueShopping}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmation;