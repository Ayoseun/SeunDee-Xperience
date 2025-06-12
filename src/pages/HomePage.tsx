import { useEffect, useState } from 'react';
import {  Users, Camera,  Calendar, Activity, Zap, Stethoscope, Star } from 'lucide-react';
import Header from '../components/Header';
import VitalCard from '../components/VitalCard';

import DeeImage from '../assets/Dee.jpeg';
import AeeImage from '../assets/Aee.jpeg';
import weddingRingsImage from '../assets/ring.png';
import BottomNavigation from '../components/NavBar';
import Confetti from 'react-confetti';

const HomePage = ({darkMode,setDarkMode}:any) => {
  
  const [tokens, setTokens] = useState(250);
  const [userName] = useState('Guest');
  const [rsvpCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);
 const [countdown, setCountdown] = useState('');

  const targetDate:any = new Date('2025-09-20T00:00:00');

  const coupleData = {
    bride: { name: "Deborah Essien", profession: "Registered Nurse", avatar: DeeImage },
    groom: { name: "Solomon Ayo", profession: "Blockchain Engineer", avatar: AeeImage },
    weddingDate: "September 30, 2025",
    venue: "VIP Pavillion, Igando, Lagos"
  };

  const bgClass = darkMode ? 'bg-black' : 'bg-white/50';
  const textClass = darkMode ? 'text-white' : 'text-white';
  const cardBgClass = darkMode ? 'bg-gray-800/80' : 'bg-white/80';
  const borderClass = darkMode ? 'border-gray-700/50' : 'border-gray-200/50';

    useEffect(() => {
    const updateCountdown = () => {
      const now:any = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setCountdown('0 days, 0 hrs, 0 mins');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      setCountdown(`${days}days ,${hours}h,${minutes}m`);
    };

    updateCountdown(); // initial call

    const timer = setInterval(updateCountdown, 60 * 1000); // update every minute

    return () => clearInterval(timer);
  }, []);
 // Auto-hide confetti after a few seconds (optional)
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    setTokens(prev => prev + 50);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`max-w-md mx-auto ${bgClass} min-h-screen `}>
      {/* Confetti component */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={300} />}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} tokens={tokens} userName={userName} />

      <div className={`flex-1  ${darkMode ? 'bg-gradient-to-br from-gray-900 to-purple-900' : 'bg-gradient-to-br from-[##fffae5] to-[#f2e9c2]'} relative overflow-y-auto`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-pulse">💕</div>
          <div className="absolute top-40 right-16 text-4xl animate-bounce">✨</div>
          <div className="absolute bottom-32 left-20 text-5xl animate-pulse">💖</div>
          <div className="absolute bottom-16 right-10 text-3xl">🌹</div>
        </div>

        <div className=" p-6 pb-8">
          <div className={`${cardBgClass} backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border ${borderClass}`}>
            <div className="text-center mb-4">
              <div className="flex justify-center items-center space-x-4 mb-3">
                <div className="flex items-center gap-4">
                  <img
                    src={coupleData.bride.avatar}
                    alt="Bride"
                    className="w-24 h-24 object-cover rounded-full p-1 bg-white/30 backdrop-blur-sm border border-rose-600/30"
                  />
                  <div className="text-4xl animate-pulse">💕</div>
                  <img
                    src={coupleData.groom.avatar}
                    alt="Groom"
                    className="w-24 h-24 object-cover rounded-full p-1 bg-white/30 backdrop-blur-sm border border-blue-600/50"
                  />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                {coupleData.bride.name.split(' ')[0]} & {coupleData.groom.name.split(' ')[0]}
              </h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{coupleData.bride.profession} × {coupleData.groom.profession}</p>
              <div className={`flex items-center justify-center space-x-2 mt-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                <Calendar className="w-4 h-4" />
                <span>{coupleData.weddingDate}</span>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gradient-to-r from-purple-900/50 to-rose-900/50 border-l-4 border-purple-400' : 'bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl p-4 mb-6 text-white shadow-lg'} rounded-xl p-4`}>
              <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-white'} mb-2 flex items-center`}>
                <img
                  src={weddingRingsImage}
                  alt="rings"
                  className="w-8 h-8 mr-2 object-cover rounded-b-full"
                />
                Smart Contract Vows
              </h3>
              <div className={`space-y-2 text-sm ${darkMode ? 'text-purple-200' : 'text-white'}`}>
                <div>• Promise to share dessert: <span className={`font-mono ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} px-2 py-1 rounded   ml-2`}>FOREVER</span></div>
                <div>• Late night snack provision: <span className={`font-mono ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} px-2 py-1 rounded text-black ml-2 `}>IMMUTABLE</span></div>
                <div>• Love token supply: <span className={`font-mono ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black' } px-2 py-1 rounded text-black ml-2 `}>UNLIMITED</span></div>
              </div>
            </div>
          </div>

          <div className={`${cardBgClass} backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg`}>
            <div className="flex items-center mb-4">
              <Stethoscope className="w-5 h-5 text-emerald-600 mr-2" />
              <h2 className={` ${darkMode ?'text-sm font-bold text-white': 'text-sm font-bold text-black'}`}>Wedding Vital Signs</h2>
              <div className="ml-auto bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                All Systems Normal
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <VitalCard title="RSVP Rate ❤️" value={rsvpCount} unit="/300" icon={Users} trend="up" color="emerald" />
              <VitalCard title="Love Pressure 💕" value="120" unit="/80" icon={Activity} trend="stable" color="rose" />
              <VitalCard title="Excitement Level ⚡" value="98" unit="%" icon={Zap} trend="up" color="purple" />
              <VitalCard title="Days to Bliss 📅"  value={countdown}  unit="" icon={Calendar} trend="down" color="amber" />
            </div>
          </div>

          <div className={`${cardBgClass} backdrop-blur-sm rounded-2xl p-6 shadow-lg`}>
            <h3 className={`text-lg font-bold ${textClass} mb-4 flex items-center`}>
              <Camera className="w-5 h-5 mr-2 text-purple-600" />
              Live Memory Stream
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square bg-gradient-to-br from-rose-200 to-purple-200 rounded-lg flex items-center justify-center text-2xl">
                  {i === 1 ? '💐' : i === 2 ? '🥂' : '💒'}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>127 memories shared today</span>
              <div className="flex items-center space-x-1 text-yellow-600">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">3,250 LOVE earned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation activeTab="home" darkMode={darkMode} />
    </div>
  );
};

export default HomePage;
