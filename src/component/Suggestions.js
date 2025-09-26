import React from 'react';
import { menuItems } from '../data/menuItem'; // Assuming you have a menuItems data file

const Suggestions = ({ subtotal, onAddToCart }) => {
  const MINIMUM_ORDER = 150;

  const getSuggestions = () => {
    const remaining = MINIMUM_ORDER - subtotal;
    if (remaining <= 0 || !menuItems || !Array.isArray(menuItems)) return [];

    const suggestions = [];
    menuItems.forEach((item) => {
      // Suggest items with price <= remaining to help meet the minimum order
      if (item.price100 && typeof item.price100 === 'number' && item.price100 <= remaining) {
        suggestions.push({
          name: item.name,
          size: '100g',
          price: item.price100,
        });
      }
      if (item.price250 && typeof item.price250 === 'number' && item.price250 <= remaining) {
        suggestions.push({
          name: item.name,
          size: '250g',
          price: item.price250,
        });
      }
    });

    // Sort by price ascending and limit to 3 suggestions
    return suggestions.sort((a, b) => a.price - b.price).slice(0, 3);
  };

  const suggestions = getSuggestions();

  return (
    <>
      {subtotal < MINIMUM_ORDER && (
        <div className="bg-yellow-100 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 font-medium">
            Minimum order amount is ₹{MINIMUM_ORDER}. Add ₹{(MINIMUM_ORDER - subtotal).toFixed(2)} more to proceed.
          </p>
          {suggestions.length > 0 ? (
            <>
              <p className="text-yellow-800 mt-2">Suggestions:</p>
              <ul className="list-disc list-inside text-sm text-yellow-800">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="mt-1">
                    {suggestion.name} ({suggestion.size}, ₹{suggestion.price})
                    <button
                      onClick={() => {
                        const item = menuItems.find((i) => i.name === suggestion.name);
                        if (item) {
                          onAddToCart(item, suggestion.size, suggestion.price);
                        }
                      }}
                      className="ml-2 text-orange-600 hover:text-orange-700 underline"
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-yellow-800 mt-2">
              No items available to meet the minimum order amount.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Suggestions;