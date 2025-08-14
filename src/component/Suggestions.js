import React from 'react';
import { menuItems } from '../data/menuItem';
 // Assuming you have a menuItems data file     

const Suggestions = ({ subtotal, onAddToCart }) => {
  const MINIMUM_ORDER = 150;

  const getSuggestions = () => {
    const remaining = MINIMUM_ORDER - subtotal;
    if (remaining <= 0) return [];

    const suggestions = [];
    menuItems.forEach(item => {
      if (item.price100g >= remaining) {
        suggestions.push({ name: item.name, size: '100g', price: item.price100g });
      }
      if (item.price250g >= remaining) {
        suggestions.push({ name: item.name, size: '250g', price: item.price250g });
      }
    });

    return suggestions.sort((a, b) => a.price - b.price).slice(0, 3);
  };

  const suggestions = getSuggestions();

  return (
    <>
      {subtotal < MINIMUM_ORDER && (
        <div className="bg-yellow-100 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 font-medium">
            Minimum order amount is ₹{MINIMUM_ORDER}. Add ₹{MINIMUM_ORDER - subtotal} more to proceed.
          </p>
          <p className="text-yellow-800 mt-2">Suggestions:</p>
          <ul className="list-disc list-inside text-sm text-yellow-800">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="mt-1">
                {suggestion.name} ({suggestion.size}, ₹{suggestion.price})
                <button
                  onClick={() => {
                    const item = menuItems.find(i => i.name === suggestion.name);
                    onAddToCart(item, suggestion.size, suggestion.size === '100g' ? item.price100g : item.price250g);
                  }}
                  className="ml-2 text-orange-600 hover:text-orange-700 underline"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Suggestions;