import React from 'react';
import { IndianRupee, Truck } from 'lucide-react';

const OrderSummary = ({ subtotal, deliveryCharge, total }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm sticky bottom-4">
      <div className="space-y-2 mb-4">
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
            <Truck size={16} />
            Delivery Charge
          </span>
          <span className="font-semibold flex items-center gap-1">
            <IndianRupee size={16} />
            {deliveryCharge}
          </span>
        </div>
        <div className="flex justify-between items-center border-t pt-2">
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
  );
};

export default OrderSummary;