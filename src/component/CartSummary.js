import React from 'react';
import { ShoppingCart, Trash2, Minus, Plus, PackageOpen, IndianRupee } from 'lucide-react';

const CartSummary = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
        <ShoppingCart size={24} />
        Your Cart ({cartItems.length})
      </h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <PackageOpen size={48} className="mx-auto mb-4 opacity-50" />
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {cartItems.map(item => (
            <div key={`${item.id}-${item.size}`} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <IndianRupee size={12} />
                    {item.size} - ₹{item.price}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id, item.size)}
                  className="text-red-500 hover:text-red-700"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
                    className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center"
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                    className="bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center"
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="font-semibold flex items-center gap-1">
                  <IndianRupee size={14} />
                  {item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartSummary;