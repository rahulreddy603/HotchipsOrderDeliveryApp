import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

import Address from '../Address';
import OrderConfirmation from '../OrderConfirmation';
import { adminInfo } from '../data/adminInfo';

const Checkout = ({ cartItems, subtotal, deliveryCharge, total, onPlaceOrder }) => {
  const MINIMUM_ORDER = 150;
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  // Validate inputs
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    console.error('Invalid cartItems:', cartItems);
    return <div>Error: Cart is empty or invalid.</div>;
  }
  if (typeof subtotal !== 'number' || typeof deliveryCharge !== 'number' || typeof total !== 'number') {
    console.error('Invalid amount values:', { subtotal, deliveryCharge, total });
    return <div>Error: Invalid amount values.</div>;
  }

  const sendWhatsAppMessage = (userDetails) => {
    console.log('sendWhatsAppMessage called');
    console.log('User Details:', userDetails);
    console.log('Admin WhatsApp:', adminInfo.whatsapp);

    if (!userDetails || !userDetails.name || !userDetails.address || !userDetails.mobile) {
      console.error('Error: Incomplete user details in localStorage');
      alert('Please fill in all address fields before proceeding.');
      return;
    }

    let whatsappNumber = adminInfo.whatsapp || adminInfo.phone;
    if (!whatsappNumber.startsWith('+')) {
      whatsappNumber = `+91${whatsappNumber}`; // Default to +91 for India, adjust as needed
    }

    if (!whatsappNumber || !/^\+\d{10,15}$/.test(whatsappNumber)) {
      console.error('Error: Invalid WhatsApp number:', whatsappNumber);
      alert('Invalid store contact number. Please contact support.');
      return;
    }

    const orderDetails = cartItems
      .map(item => `${item.name} (${item.size}) x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');
    const message = `New Order Received!\n\nCustomer Details:\nName: ${userDetails.name}\nAddress: ${userDetails.address}\nMobile: ${userDetails.mobile}\n\nOrder Details:\n${orderDetails}\n\nSubtotal: ₹${subtotal.toFixed(2)}\nDelivery Charge: ₹${deliveryCharge.toFixed(2)}\nTotal: ₹${total.toFixed(2)}`;
    const encodedMessage = encodeURIComponent(message);
    const ownerPhone = whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${ownerPhone}?text=${encodedMessage}`;

    console.log('WhatsApp URL:', whatsappUrl);

    try {
      const popup = window.open(whatsappUrl, '_blank');
      if (!popup) {
        console.error('Error: Pop-up blocked or failed to open');
        alert('Unable to open WhatsApp. Please allow pop-ups for this site.');
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      alert('Failed to send WhatsApp message. Please try again or contact support.');
    }
  };

  const handleRazorpayPayment = () => {
    if (subtotal < MINIMUM_ORDER) {
      alert(`Minimum order amount is ₹${MINIMUM_ORDER}. Please add ₹${(MINIMUM_ORDER - subtotal).toFixed(2)} more to proceed.`);
      return;
    }
    setShowAddressModal(true);
  };

  const handleAddressSubmit = async () => {
    console.log('handleAddressSubmit called');
    setIsLoading(true); // Set loading state

    if (!window.Razorpay) {
      console.error('Razorpay SDK not loaded');
      alert('Razorpay payment system failed to load. Please check your internet connection and try again.');
      setIsLoading(false);
      return;
    }

    try {
      // Fetch Razorpay key from backend
      console.log('Fetching Razorpay key...');
      const keyResponse = await fetch('https://hotchipsorderapp.onrender.com/api/razorpay-key');
      if (!keyResponse.ok) {
        throw new Error('Failed to fetch Razorpay key');
      }
      const { key } = await keyResponse.json();
      console.log('Razorpay key fetched:', key);

      // Create Razorpay order
      console.log('Creating Razorpay order...');
      const response = await fetch('https://hotchipsorderapp.onrender.com/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: total * 100 }), // Razorpay expects amount in paise
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      const order = await response.json();
      console.log('Order created:', order);

      // Get user details for prefill
      const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

      const options = {
        key, // Use fetched key
        amount: order.amount,
        currency: 'INR',
        name: adminInfo.storeName || 'Shree Laxmi Hot Chips',
        description: 'Shree Laxmi Hot Chips Order',
        image: 'https://via.placeholder.com/150',
        order_id: order.id,
        handler: async function (response) {
          console.log('Payment response:', response);
          try {
            const verifyResponse = await fetch('https://hotchipsorderapp.onrender.com/api/verify-payment', {
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
            console.log('Payment verification result:', verifyResult);

            if (!verifyResponse.ok) {
              throw new Error(`Failed to verify payment: ${verifyResponse.statusText}`);
            }

            if (verifyResult.success) {
              console.log('User details for WhatsApp:', userDetails);
              sendWhatsAppMessage(userDetails);
              onPlaceOrder();
              setShowConfirmation(true);
            } else {
              console.error('Payment verification failed:', verifyResult.message);
              alert('Payment verification failed. Please try again or contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert(`Error verifying payment: ${error.message}. Please try again.`);
          }
        },
        prefill: {
          name: userDetails.name || adminInfo.name,
          email: userDetails.email || adminInfo.email,
          contact: userDetails.mobile || adminInfo.phone.replace(/[^0-9]/g, ''),
        },
        theme: {
          color: '#F97316',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}. Please try again.`);
      });
      console.log('Opening Razorpay checkout');
      rzp.open();
    } catch (error) {
      console.error('Payment initiation error:', error);
      alert(`Error initiating payment: ${error.message}. Please try again or contact support.`);
    } finally {
      setIsLoading(false); // Reset loading state
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
            disabled={subtotal < MINIMUM_ORDER || isLoading}
          >
            <CreditCard size={20} />
            {isLoading ? 'Processing...' : 'Pay with Razorpay'}
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