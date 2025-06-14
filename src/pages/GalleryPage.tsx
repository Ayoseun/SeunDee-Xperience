import { useState } from 'react';
import { Camera } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/NavBar';

const GalleryPage = ({darkMode,setDarkMode,name}:any) => {
  
  const [tokens] = useState(250);

 

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const cardBgClass = darkMode ? 'bg-gray-800/80' : 'bg-white/80';

  return (
    <div className={`max-w-md mx-auto ${bgClass} min-h-screen`}>
     <Header darkMode={darkMode} setDarkMode={setDarkMode} tokens={tokens} userName={name} />

      <div className={`flex-1 ${bgClass} overflow-y-auto`}>
        <div className="p-6 pb-8">
          <div className={`${cardBgClass} rounded-2xl p-6 mb-6 shadow-lg`}>
            <h2 className={`text-2xl font-bold ${textClass} mb-4 flex items-center`}>
              <Camera className="w-6 h-6 mr-2 text-purple-600" />
              Gallery
            </h2>

            <div className="mb-6">
              <h3 className={`text-lg font-bold ${textClass} mb-2`}>Stories</h3>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    Story {i}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className={`text-lg font-bold ${textClass} mb-2`}>Journey</h3>
              <div className="relative">
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex-shrink-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      Journey {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-bold ${textClass} mb-2`}>Memories</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-rose-200 to-purple-200 rounded-lg flex items-center justify-center text-2xl">
                    {i % 3 === 0 ? '💐' : i % 2 === 0 ? '🥂' : '💒'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
        <BottomNavigation activeTab="gallery" darkMode={darkMode} />
    </div>
  );
};

export default GalleryPage;
