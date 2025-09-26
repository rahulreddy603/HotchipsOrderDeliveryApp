import { MapPin, Phone, MessageCircle, User } from 'lucide-react';
import { adminInfo } from '../data/adminInfo';


const ContactComponent = () => {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${adminInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I want to order from HotChips!`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${adminInfo.phone}`, '_self');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">Contact Owner</h2>
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="text-center border-b pb-6">
          <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{adminInfo.name}</h3>
          <p className="text-gray-600">{adminInfo.storeName}</p>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-orange-500 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-800">Store Location</h4>
            <p className="text-gray-600 text-sm">{adminInfo.location}</p>
          </div>
        </div>
        <div className="space-y-3">
          <button
            onClick={handleCall}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Phone size={20} /> Call Owner
          </button>
          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} /> Chat on WhatsApp
          </button>
        </div>
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600">Email: {adminInfo.email}</p>
          
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;