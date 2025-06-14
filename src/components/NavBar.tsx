import { Heart, Users, Camera, Wallet, GalleryVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface BottomNavigationProps {
  activeTab: string;
  darkMode: boolean;
}

const BottomNavigation = ({ activeTab, darkMode }: BottomNavigationProps) => {
  const navigate = useNavigate();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const navigateTo = (tabId: string) => {
    navigate(`/${tabId}`);
  };

  const showTooltip = (tabId: string) => {
    setActiveTooltip(tabId);
  };

  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  // Auto-hide tooltip after 2 seconds
  useEffect(() => {
    if (activeTooltip) {
      const timer = setTimeout(() => {
        setActiveTooltip(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeTooltip]);

  const tooltipMessages = {
    home: 'Share your love story and wedding moments',
    rsvp: 'Manage guest responses and attendance',
    camera: 'Take photos and create memories',
    blockchain: 'View digital wedding certificates and NFTs',
    gallery: 'Browse all wedding photos and videos'
  };

  return (
    <div className={`${darkMode ? 'bg-black/95 border-gray-700/50' : 'bg-[#f2e9c2]/95 border-gray-200/50'} backdrop-blur-sm border-t px-4 md:px-6 py-3 sticky bottom-0 relative`}>
      <div className="flex items-center justify-around relative">
        {[
          { id: 'home', icon: Heart, label: 'Love', color: 'rose' },
          { id: 'rsvp', icon: Users, label: 'RSVP', color: 'purple' }
        ].map(({ id, icon: Icon, label, color }) => (
          <div key={id} className="relative">
            <button
              onClick={() => navigateTo(id)}
              onTouchStart={() => showTooltip(id)}
              onTouchEnd={hideTooltip}
              onMouseEnter={() => showTooltip(id)}
              onMouseLeave={hideTooltip}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all ${activeTab === id
                ? `bg-gradient-to-r from-${color}-500 to-${color}-600 text-white shadow-lg transform scale-105`
                : `${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} hover:bg-${color}-50 ${darkMode ? 'hover:bg-gray-800' : ''}`
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
            
            {activeTooltip === id && (
              <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap z-50 animate-in fade-in-0 zoom-in-95 duration-200 ${
                darkMode 
                  ? 'bg-gray-800 text-white border border-gray-700' 
                  : 'bg-white text-gray-800 border border-gray-200 shadow-lg'
              }`}>
                {tooltipMessages[id as keyof typeof tooltipMessages]}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                  darkMode ? 'border-t-gray-800' : 'border-t-white'
                }`} />
              </div>
            )}
          </div>
        ))}
        
        {/* Floating Camera Button - Center */}
        <div className="relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20">
            <button
              onClick={() => navigateTo('camera')}
              onTouchStart={() => showTooltip('camera')}
              onTouchEnd={hideTooltip}
              onMouseEnter={() => showTooltip('camera')}
              onMouseLeave={hideTooltip}
              className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 ${
                activeTab === 'camera'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white transform scale-110 shadow-pink-500/40'
                  : 'bg-gradient-to-r from-pink-400 to-rose-400 text-white hover:from-pink-500 hover:to-rose-500 hover:scale-105'
              } flex items-center justify-center border-4 ${darkMode ? 'border-black' : 'border-[#f2e9c2]'}`}
            >
              <Camera className="w-7 h-7" />
            </button>
            
            {activeTooltip === 'camera' && (
              <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap z-50 animate-in fade-in-0 zoom-in-95 duration-200 ${
                darkMode 
                  ? 'bg-gray-800 text-white border border-gray-700' 
                  : 'bg-white text-gray-800 border border-gray-200 shadow-lg'
              }`}>
                {tooltipMessages['camera']}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                  darkMode ? 'border-t-gray-800' : 'border-t-white'
                }`} />
              </div>
            )}
          </div>
        </div>
        
        {[
          { id: 'blockchain', icon: Wallet, label: 'Wallet', color: 'green' },
          { id: 'gallery', icon: GalleryVertical, label: 'Gallery', color: 'black' }
        ].map(({ id, icon: Icon, label, color }) => (
          <div key={id} className="relative">
            <button
              onClick={() => navigateTo(id)}
              onTouchStart={() => showTooltip(id)}
              onTouchEnd={hideTooltip}
              onMouseEnter={() => showTooltip(id)}
              onMouseLeave={hideTooltip}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all ${activeTab === id
                ? `bg-gradient-to-r from-${color}-500 to-${color}-600 text-white shadow-lg transform scale-105`
                : `${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} hover:bg-${color}-50 ${darkMode ? 'hover:bg-gray-800' : ''}`
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
            
            {activeTooltip === id && (
              <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap z-50 animate-in fade-in-0 zoom-in-95 duration-200 ${
                darkMode 
                  ? 'bg-gray-800 text-white border border-gray-700' 
                  : 'bg-white text-gray-800 border border-gray-200 shadow-lg'
              }`}>
                {tooltipMessages[id as keyof typeof tooltipMessages]}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                  darkMode ? 'border-t-gray-800' : 'border-t-white'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;