import { useEffect } from 'react';
import CartSummary from './CartSummary';
import OrderSummary from './OrderSummary';
import Suggestions from './Suggestions';
import Checkout from './Checkout';

const CartComponent = ({ cartItems, setCartItems, onUpdateQuantity, onRemoveItem, onPlaceOrder, onAddToCart }) => {
  const DELIVERY_CHARGE = 40;

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, [setCartItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + DELIVERY_CHARGE;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <CartSummary
        cartItems={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
      />
      <Suggestions subtotal={subtotal} onAddToCart={onAddToCart} />
      <OrderSummary subtotal={subtotal} deliveryCharge={DELIVERY_CHARGE} total={total} />
      <Checkout
        cartItems={cartItems}
        subtotal={subtotal}
        deliveryCharge={DELIVERY_CHARGE}
        total={total}
        onPlaceOrder={onPlaceOrder}
      />
    </div>
  );
};

export default CartComponent;