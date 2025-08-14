import { adminInfo } from "./data/adminInfo";


const Header = ({ activeTab, setActiveTab, cartItems }) => {
  // Calculate total cart item count for the b

  return (
    <div>
      {/* Branding Section */}
      <div className="bg-orange-500 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">🔥 {adminInfo.storeName}</h1>
        <p className="text-sm opacity-90">Fast Food Delivery</p>
      </div>

      
      
    </div>
  );
};

export default Header;