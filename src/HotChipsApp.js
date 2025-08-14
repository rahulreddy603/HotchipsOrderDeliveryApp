import { useState, useEffect } from 'react';
import Header from './Header';
import MenuComponent from './component/MenuComponent';
import CartComponent from './component/CartComponent';
import ContactComponent from './component/ContactComponent';

const HotChipsApp = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [cartItems, setCartItems] = useState([]);

  // Load cartItems from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cartItems to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (item, size, price) => {
    const existingItemIndex = cartItems.findIndex(
      cartItem => cartItem.id === item.id && cartItem.size === size
    );

    if (existingItemIndex > -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      const newCartItem = {
        id: item.id,
        name: item.name,
        size: size,
        price: price,
        quantity: 1
      };
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const updateQuantity = (id, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id, size);
    } else {
      const updatedCart = cartItems.map(item =>
        item.id === id && item.size === size ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
    }
  };

  const removeFromCart = (id, size) => {
    setCartItems(cartItems.filter(item => !(item.id === id && item.size === size)));
  };

  const placeOrder = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    localStorage.removeItem('userDetails');
  };

  // Calculate total cart items
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen flex flex-col relative">
      {/* Header (without tabs) */}
      <Header cartItems={cartItems} />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'menu' && <MenuComponent onAddToCart={addToCart} />}
        {activeTab === 'cart' && (
          <CartComponent
            cartItems={cartItems || []}
            setCartItems={setCartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onPlaceOrder={placeOrder}
            onAddToCart={addToCart}
          />
        )}
        {activeTab === 'contact' && <ContactComponent />}
      </div>

      {/* Fixed Bottom Navigation with Cart Count */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-2 flex justify-around items-center z-50">
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex flex-col items-center p-2 rounded-lg ${
            activeTab === 'menu' ? 'bg-orange-500' : 'hover:bg-gray-700'
          }`}
        >
          <span className="text-xl">🍽️</span>
          <span className="text-xs mt-1">Menu</span>
        </button>
        <button
          onClick={() => setActiveTab('cart')}
          className={`flex flex-col items-center p-2 rounded-lg relative ${
            activeTab === 'cart' ? 'bg-orange-500' : 'hover:bg-gray-700'
          }`}
        >
          <span className="text-xl">🛒</span>
          {totalCartItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex flex-col items-center p-2 rounded-lg ${
            activeTab === 'contact' ? 'bg-orange-500' : 'hover:bg-gray-700'
          }`}
        >
          <span className="text-xl">📞</span>
          <span className="text-xs mt-1">Contact</span>
        </button>
      </div>
    </div>
  );
};

export default HotChipsApp;