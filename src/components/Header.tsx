import { CloudSun, Moon, Star, Heart, Camera, Wifi } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  tokens: number;
  userName: string;
}

const Header = ({ setDarkMode, darkMode, tokens, userName }: HeaderProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1); // -1 means show original header
  
  const weddingMessages = [
    {
      icon: <Heart className="w-5 h-5 text-pink-400" />,
      text: "Thank you for celebrating this special day with us! 💕"
    },
    {
      icon: <Camera className="w-5 h-5 text-blue-400" />,
      text: "📸 Capture memories! Free airtime & data for sharing photos today!"
    },
    {
      icon: <Wifi className="w-5 h-5 text-green-400" />,
      text: "📱 Upload your photos using our complimentary data - no charges!"
    },
    {
      icon: <Star className="w-5 h-5 text-yellow-400" />,
      text: "✨ Your presence is our present - thank you for being here!"
    },
    {
      icon: <Heart className="w-5 h-5 text-red-400" />,
      text: "💖 Love is in the air! Share your beautiful moments with us"
    },
    {
      icon: <Camera className="w-5 h-5 text-purple-400" />,
      text: "📷 Don't forget to tag us in your photos! #OurWeddingDay"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => {
        if (prev === -1) {
          // Show first message
          return 0;
        } else if (prev < weddingMessages.length - 1) {
          // Show next message
          return prev + 1;
        } else {
          // Return to original header
          return -1;
        }
      });
    }, 5000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [weddingMessages.length]);

  const textClass = darkMode ? 'text-white' : 'text-white';
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const isShowingMessage = currentMessageIndex !== -1;
  const currentMessage = isShowingMessage ? weddingMessages[currentMessageIndex] : null;

  return (
    <div className={`${darkMode ? 'bg-black/95' : 'bg-[#777723]'} backdrop-blur-sm border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} px-4 md:px-6 py-2 sticky top-0 z-20 transition-all duration-500`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {isShowingMessage && currentMessage ? (
            // Wedding message view
            <div className="flex items-center space-x-3 animate-fade-in">
              {currentMessage.icon}
              <div>
                <p className={`text-sm md:text-base font-medium ${textClass} animate-pulse`}>
                  {currentMessage.text}
                </p>
              </div>
            </div>
          ) : (
            // Original header view
            <div className="flex items-center space-x-3 animate-fade-in">
              <div>
                <h1 className={`text-lg md:text-xl font-bold ${textClass}`}>
                  💕 {userName}
                </h1>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gold-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-all`}
          >
            {darkMode ? <CloudSun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="bg-gradient-to-r from-green-500 to-green-900 rounded-full px-3 py-1 shadow-sm">
            <div className="flex items-center space-x-1 text-white">
              <Star className="w-4 h-4" />
              <span className="font-bold text-sm md:text-base">{tokens}</span>
            </div>
          </div>
        </div>
      </div>

      <style type="text/css">{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Header;