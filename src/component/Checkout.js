import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

import Address from '../Address';
import OrderConfirmation from '../OrderConfirmation';
import { adminInfo } from '../data/adminInfo';


const Checkout = ({ cartItems, subtotal, deliveryCharge, total, onPlaceOrder }) => {
  const MINIMUM_ORDER = 150;
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const sendWhatsAppMessage = (userDetails) => {
    console.log('sendWhatsAppMessage called'); // Debug
    console.log('User Details:', userDetails); // Debug
    console.log('Admin WhatsApp:', adminInfo.whatsapp); // Debug

    if (!userDetails || !userDetails.name || !userDetails.address || !userDetails.mobile) {
      console.error('Error: Incomplete user details in localStorage');
      alert('Error: Please fill in all address fields.');
      return;
    }

    let whatsappNumber = adminInfo.whatsapp || adminInfo.phone;
    if (!whatsappNumber.startsWith('+')) {
      whatsappNumber = `+${whatsappNumber}`; // Add country code
    }

    if (!whatsappNumber || !/^\+\d{10,15}$/.test(whatsappNumber)) {
      console.error('Error: Invalid WhatsApp number:', whatsappNumber);
      alert('Error: Invalid owner WhatsApp number. Please contact support.');
      return;
    }

    const orderDetails = cartItems
      .map(item => `${item.name} (${item.size}) x${item.quantity} - ₹${item.price * item.quantity}`)
      .join('\n');
    const message = `New Order Received!\n\nCustomer Details:\nName: ${userDetails.name}\nAddress: ${userDetails.address}\nMobile: ${userDetails.mobile}\n\nOrder Details:\n${orderDetails}\n\nSubtotal: ₹${subtotal}\nDelivery Charge: ₹${deliveryCharge}\nTotal: ₹${total}`;
    const encodedMessage = encodeURIComponent(message);
    const ownerPhone = whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${ownerPhone}?text=${encodedMessage}`;

    console.log('WhatsApp URL:', whatsappUrl); // Debug

    try {
      const popup = window.open(whatsappUrl, '_blank');
      if (!popup) {
        console.error('Error: Pop-up blocked or failed to open');
        alert('Failed to open WhatsApp. Please allow pop-ups for this site.');
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      alert('Failed to send WhatsApp message. Please try again.');
    }
  };

  const handleRazorpayPayment = () => {
    if (subtotal < MINIMUM_ORDER) {
      alert(`Minimum order amount is ₹${MINIMUM_ORDER}. Please add ₹${MINIMUM_ORDER - subtotal} more to proceed.`);
      return;
    }
    setShowAddressModal(true);
  };

  const handleAddressSubmit = async () => {
    console.log('handleAddressSubmit called'); // Debug
    if (!window.Razorpay) {
      console.error('Razorpay SDK not loaded');
      alert('Razorpay SDK failed to load. Please check your internet connection or try again later.');
      return;
    }

    try {
      console.log('Creating Razorpay order...'); // Debug
      const response = await fetch('http://localhost:5000/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: total * 100 }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      const order = await response.json();
      console.log('Order created:', order); // Debug

      const options = {
        key: 'rzp_live_KbNeSNLqfHTzAB', // Replace with your Razorpay test key
        amount: order.amount,
        currency: 'INR',
        name: adminInfo.storeName,
        description: 'Shree Laxmi Hot Chips Order',
        image: 'https://via.placeholder.com/150',
        order_id: order.id,
        handler: async function (response) {
          console.log('Payment response:', response); // Debug
          try {
            const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyResult = await verifyResponse.json();
            console.log('Payment verification result:', verifyResult); // Debug

            if (!verifyResponse.ok) {
              throw new Error(`Failed to verify payment: ${verifyResponse.statusText}`);
            }

            if (verifyResult.success) {
              const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
              console.log('User details for WhatsApp:', userDetails); // Debug
              sendWhatsAppMessage(userDetails);
              onPlaceOrder();
              setShowConfirmation(true);
            } else {
              console.error('Payment verification failed');
              alert('Payment verification failed. Please try again.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Error verifying payment. Please try again.');
          }
        },
        prefill: {
          name: adminInfo.name,
          email: adminInfo.email,
          contact: adminInfo.phone.replace(/[^0-9]/g, ''),
        },
        theme: {
          color: '#F97316',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
      });
      console.log('Opening Razorpay checkout'); // Debug
      rzp.open();
    } catch (error) {
      console.error('Payment initiation error:', error);
      alert(`Error initiating payment: ${error.message}. Please try again.`);
    }
  };

  const handleContinueShopping = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      {showConfirmation ? (
        <OrderConfirmation
          cartItems={cartItems}
          subtotal={subtotal}
          deliveryCharge={deliveryCharge}
          total={total}
          userDetails={JSON.parse(localStorage.getItem('userDetails') || '{}')}
          onContinueShopping={handleContinueShopping}
        />
      ) : (
        <>
          <button
            onClick={handleRazorpayPayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            disabled={subtotal < MINIMUM_ORDER}
          >
            <CreditCard size={20} />
            Pay with Razorpay
          </button>
          {showAddressModal && (
            <Address
              onClose={() => setShowAddressModal(false)}
              onSubmit={handleAddressSubmit}
              cartItems={cartItems}
              subtotal={subtotal}
              deliveryCharge={deliveryCharge}
              total={total}
            />
          )}
        </>
      )}
    </>
  );
};

export default Checkout;