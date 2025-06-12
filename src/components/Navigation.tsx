
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Camera, Wallet, User } from 'lucide-react';

const Navigation = ({ activeTab, darkMode }:any) => {
  const navigate = useNavigate();

  const navigateTo = (tabId:any) => {
    navigate(`/${tabId}`);
  };

  return (
    <div className={`${darkMode ? 'bg-black/95 border-gray-700/50' : 'bg-[#f2e9c2]/95 border-gray-200/50'} backdrop-blur-sm border-t px-4 md:px-6 py-3 sticky bottom-0`}>
      <div className="flex items-center justify-around">
        {[
          { id: 'home', icon: Heart, label: 'Love', color: 'rose' },
          { id: 'rsvp', icon: Users, label: 'RSVP', color: 'purple' },
          { id: 'camera', icon: Camera, label: 'Capture', color: 'pink' },
          { id: 'blockchain', icon: Wallet, label: 'Wallet', color: 'green' },
          { id: 'gallery', icon: User, label: 'Profile', color: 'black' }
        ].map(({ id, icon: Icon, label, color }) => (
          <button
            key={id}
            onClick={() => navigateTo(id)}
            className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all ${activeTab === id
                ? `bg-gradient-to-r from-${color}-500 to-${color}-600 text-white shadow-lg transform scale-105`
                : `${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} hover:bg-${color}-50 ${darkMode ? 'hover:bg-gray-800' : ''}`
              }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
