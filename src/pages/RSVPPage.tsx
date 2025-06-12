import { useState } from 'react';
import { Users, Plus, Minus, QrCode } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/NavBar';

const RSVPPage = ({darkMode,setDarkMode}:any) => {

  const [tokens] = useState(250);
  const [userName] = useState('Guest');
  const [rsvpCount] = useState(78);
  const [guestCount, setGuestCount] = useState(2);

 

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const cardBgClass = darkMode ? 'bg-gray-800/80' : 'bg-white/80';

  return (
    <div className={`max-w-md mx-auto ${bgClass} min-h-screen`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} tokens={tokens} userName={userName} />

      <div className={`flex-1 ${bgClass} overflow-y-auto`}>
        <div className="p-6 pb-8">
          <div className={`${cardBgClass} rounded-2xl p-6 mb-6 shadow-lg`}>
            <h2 className={`text-2xl font-bold ${textClass} mb-4 flex items-center`}>
              <Users className="w-6 h-6 mr-2 text-purple-600" />
              Guest Management
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className={`text-center p-4 ${darkMode ? 'bg-green-900/30' : 'bg-green-50'} rounded-xl`}>
                <div className="text-2xl font-bold text-green-600">{rsvpCount}</div>
                <div className="text-sm text-green-700">Confirmed</div>
              </div>
              <div className={`text-center p-4 ${darkMode ? 'bg-amber-900/30' : 'bg-amber-50'} rounded-xl`}>
                <div className="text-2xl font-bold text-amber-600">15</div>
                <div className="text-sm text-amber-700">Pending</div>
              </div>
              <div className={`text-center p-4 ${darkMode ? 'bg-red-900/30' : 'bg-red-50'} rounded-xl`}>
                <div className="text-2xl font-bold text-red-600">7</div>
                <div className="text-sm text-red-700">Declined</div>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gradient-to-r from-purple-900/50 to-rose-900/50' : 'bg-gradient-to-r from-purple-100 to-rose-100'} rounded-xl p-4 mb-4`}>
              <div className="flex items-center justify-between">
                <span className={`font-medium ${textClass}`}>Your Guest Count</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className={`w-8 h-8 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all`}
                  >
                    <Minus className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  </button>
                  <span className={`text-xl font-bold ${darkMode ? 'text-purple-300' : 'text-purple-900'} min-w-[2rem] text-center`}>{guestCount}</span>
                  <button
                    onClick={() => setGuestCount(guestCount + 1)}
                    className={`w-8 h-8 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all`}
                  >
                    <Plus className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} border-2 border-dashed rounded-xl p-6 mb-4`}>
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">💊</div>
                <h3 className={`font-bold text-lg ${textClass}`}>Digital Prescription</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dr. Love's Wedding Remedy</p>
              </div>

              <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-lg p-4 font-mono text-sm mb-4`}>
                <div className={textClass}><strong>Patient:</strong> Wedding Guest</div>
                <div className={textClass}><strong>Prescription:</strong> Take 1 celebration</div>
                <div className={textClass}><strong>Instructions:</strong> Mix with dancing, repeat as needed</div>
                <div className={textClass}><strong>Side Effects:</strong> Extreme joy, spontaneous crying</div>
                <div className={textClass}><strong>Refills:</strong> Unlimited memories</div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2">
                <QrCode className="w-5 h-5" />
                <span>Generate QR Invitation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
        <BottomNavigation activeTab="rsvp" darkMode={darkMode} />
    </div>
  );
};

export default RSVPPage;
