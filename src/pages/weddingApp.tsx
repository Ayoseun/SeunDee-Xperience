import  { useState } from 'react';
import { Camera, Heart,  Wallet, User, Upload, Star, Zap, Activity, Calendar, Users, QrCode,  Clock, Stethoscope, Plus, Minus,  MessageSquare,  Moon, Sun } from 'lucide-react';

const WeddingApp = () => {
  const [activeTab, setActiveTab] = useState('welcome');
  const [darkMode, setDarkMode] = useState(false);
  const [tokens, setTokens] = useState(250);
  const [isCapturing, setIsCapturing] = useState(false);
  const [recentPhoto, setRecentPhoto] = useState(false);
  const [rsvpCount, setRsvpCount] = useState(78);
  const [guestCount, setGuestCount] = useState(2);
  const [userName, setUserName] = useState('');

  const coupleData = {
    bride: { name: "Deborah Essien", profession: "Registered Nurse", avatar: "👩‍⚕️" },
    groom: { name: "Solomon Ayo", profession: "Blockchain Engineer", avatar: "👨‍💻" },
    weddingDate: "September 30, 2025",
    venue: "VIP Pavillion, Igando, Lagos"
  };

  const navigateTo = (tabId:any) => {
    setActiveTab(tabId);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePhotoCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setRecentPhoto(true);
      setTokens(prev => prev + 25);
      setTimeout(() => setRecentPhoto(false), 2000);
    }, 1000);
  };

  const handleNameSubmit = (e:any) => {
    e.preventDefault();
    if (userName.trim()) {
      setRsvpCount(79);
      navigateTo('home');
    }
  };

  const bgClass = darkMode ? 'bg-black' : 'bg-olive-50';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const cardBgClass = darkMode ? 'bg-gray-800/80' : 'bg-white/80';
  const borderClass = darkMode ? 'border-gray-700/50' : 'border-gray-200/50';

  const WelcomeScreen = () => (
    <div className={`flex items-center justify-center h-screen ${bgClass}`} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519225421980-715cb0215aed)', backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 text-center p-6 rounded-lg max-w-md w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">SEUNDEE XPERIENCE</h1>
        <p className="text-xl md:text-2xl text-white mb-8">Come celebrate our joy</p>
        <form onSubmit={handleNameSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 rounded-lg border border-white bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-olive-600 to-magenta-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );

  const VitalCard = ({ title, value, unit, icon: Icon, trend, color = "green" }:any) => (
    <div className={`${cardBgClass} backdrop-blur-sm rounded-xl p-4 border ${borderClass} shadow-sm hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 text-${color}-600`} />
        <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-700`}>
          {trend === 'up' ? '↗ Healthy' : trend === 'stable' ? '→ Stable' : '↓ Critical'}
        </div>
      </div>
      <div className={`text-xl md:text-2xl font-bold ${textClass} mb-1`}>{value}{unit}</div>
      <div className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{title}</div>
    </div>
  );

  const BlockchainTx = ({ type, amount, hash, status }:any) => (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-3 text-white mb-2">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${status === 'confirmed' ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
          <span className="text-sm md:text-base font-medium">{type}</span>
        </div>
        <span className="text-xs md:text-sm text-gray-400">{status}</span>
      </div>
      <div className="text-lg md:text-xl font-bold text-gold-400">+{amount} LOVE</div>
      <div className="text-xs md:text-sm text-gray-400 font-mono">Tx: {hash}</div>
    </div>
  );

  const TokenReward = ({ show, amount }:any) => (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
      <div className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
        <Star className="w-6 h-6 animate-spin" />
        <div>
          <div className="font-bold text-lg md:text-xl">+{amount} LOVE</div>
          <div className="text-xs md:text-sm opacity-90">Token Minted Successfully!</div>
        </div>
        <Zap className="w-6 h-6" />
      </div>
    </div>
  );

  const Header = () => (
    <div className={`${darkMode ? 'bg-black/95' : 'bg-olive-50/95'} backdrop-blur-sm border-b ${borderClass} px-4 md:px-6 py-4 sticky top-0 z-20`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className={`text-lg md:text-xl font-bold ${textClass}`}>
             💕 {userName}
           
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gold-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-all`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full px-3 py-1 shadow-sm">
            <div className="flex items-center space-x-1 text-white">
              <Star className="w-4 h-4" />
              <span className="font-bold text-sm md:text-base">{tokens}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HomeInterface = () => (
    <div className={`flex-1 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-purple-900' : 'bg-gradient-to-br from-rose-50 to-purple-50'} relative overflow-y-auto`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-pulse">💕</div>
        <div className="absolute top-40 right-16 text-4xl animate-bounce">✨</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-pulse">💖</div>
        <div className="absolute bottom-16 right-10 text-3xl">🌹</div>
      </div>

      <div className="relative z-10 p-6 pb-24">
        <div className={`${cardBgClass} backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border ${borderClass}`}>
          <div className="text-center mb-4">
            <div className="flex justify-center items-center space-x-4 mb-3">
              <div className="text-6xl">{coupleData.bride.avatar}</div>
              <div className="text-4xl animate-pulse">💕</div>
              <div className="text-6xl">{coupleData.groom.avatar}</div>
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

          <div className={`${darkMode ? 'bg-gradient-to-r from-purple-900/50 to-rose-900/50 border-l-4 border-purple-400' : 'bg-gradient-to-r from-purple-100 to-rose-100 border-l-4 border-purple-500'} rounded-xl p-4`}>
            <h3 className={`font-bold ${darkMode ? 'text-purple-300' : 'text-purple-900'} mb-2 flex items-center`}>
              <Heart className="w-4 h-4 mr-2" />
              Smart Contract Vows
            </h3>
            <div className={`space-y-1 text-sm ${darkMode ? 'text-purple-200' : 'text-purple-800'}`}>
              <div>• Promise to share dessert: <span className={`font-mono ${darkMode ? 'bg-gray-700' : 'bg-white'} px-2 py-1 rounded`}>FOREVER</span></div>
              <div>• Late night snack provision: <span className={`font-mono ${darkMode ? 'bg-gray-700' : 'bg-white'} px-2 py-1 rounded`}>IMMUTABLE</span></div>
              <div>• Love token supply: <span className={`font-mono ${darkMode ? 'bg-gray-700' : 'bg-white'} px-2 py-1 rounded`}>UNLIMITED</span></div>
            </div>
          </div>
        </div>

        <div className={`${cardBgClass} backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg`}>
          <div className="flex items-center mb-4">
            <Stethoscope className="w-5 h-5 text-emerald-600 mr-2" />
            <h2 className={`text-lg font-bold ${textClass}`}>Wedding Vital Signs</h2>
            <div className="ml-auto bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
              All Systems Normal
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <VitalCard title="RSVP Rate ❤️" value={rsvpCount} unit="/100" icon={Users} trend="up" color="emerald" />
            <VitalCard title="Love Pressure 💕" value="120" unit="/80" icon={Activity} trend="stable" color="rose" />
            <VitalCard title="Excitement Level ⚡" value="98" unit="%" icon={Zap} trend="up" color="purple" />
            <VitalCard title="Days to Bliss 📅" value="3" unit=" days" icon={Clock} trend="down" color="amber" />
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
  );

  const RSVPInterface = () => (
    <div className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} overflow-y-auto`}>
      <div className="p-6 pb-24">
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
  );

  const BlockchainInterface = () => (
    <div className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} overflow-y-auto`}>
      <div className="p-6 pb-24">
        <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl p-6 mb-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Solana Wedding Wallet</h2>
            <div className="bg-green-500 rounded-full p-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-yellow-400 mb-2">{tokens}</div>
            <div className="text-purple-200">LOVE Tokens (SPL)</div>
            <div className="text-xs text-purple-300 font-mono mt-1">
              Wallet: 5D7J...nR8k
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-sm text-purple-200">Token Supply</div>
              <div className="text-lg font-bold">∞ UNLIMITED</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-sm text-purple-200">Network</div>
              <div className="text-lg font-bold">Solana Devnet</div>
            </div>
          </div>
        </div>

        <div className={`${cardBgClass} rounded-2xl p-6 mb-6 shadow-lg`}>
          <h3 className={`text-lg font-bold ${textClass} mb-4`}>Recent Transactions</h3>
          <BlockchainTx
            type="Photo Upload Reward"
            amount="25"
            hash="3NK8...9mL2"
            status="confirmed"
          />
          <BlockchainTx
            type="Video Share Bonus"
            amount="50"
            hash="7QR5...kT9n"
            status="confirmed"
          />
          <BlockchainTx
            type="Group Photo Mint"
            amount="100"
            hash="2MX7...vB4p"
            status="pending"
          />
        </div>

        <div className={`${cardBgClass} rounded-2xl p-6 shadow-lg`}>
          <h3 className={`text-lg font-bold ${textClass} mb-4`}>Redemption Store</h3>
          <div className="space-y-3">
            {[
              { item: 'MTN Airtime ₦500', cost: 100, icon: '📱', available: true },
              { item: 'Data Bundle 1GB', cost: 150, icon: '📶', available: true },
              { item: 'Wedding Photo NFT', cost: 200, icon: '🖼️', available: tokens >= 200 }
            ].map((reward, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${reward.available ? `${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}` : `${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'} opacity-50`}`}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{reward.icon}</span>
                  <span className={`font-medium ${textClass}`}>{reward.item}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-mono`}>{reward.cost} LOVE</span>
                  <button
                    disabled={!reward.available}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      reward.available
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {reward.available ? 'Redeem' : 'Insufficient'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CameraInterface = () => (
    <div className={`flex-1 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-purple-900' : 'bg-gradient-to-br from-purple-50 to-pink-50'} relative overflow-y-auto`}>
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>

      <div className="relative z-10 p-6 pb-32">
        <div className="flex justify-between items-center mb-6">
          <div className={`${cardBgClass} backdrop-blur-sm rounded-full px-4 py-2 shadow-sm`}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Live Wedding 💒</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl p-4 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold mb-1">💐 Couple Spotting Challenge</h3>
              <p className="text-sm opacity-90">Find Sarah & Michael = 3x tokens!</p>
            </div>
            <div className="text-2xl">👰‍♀️🤵‍♂️</div>
          </div>
        </div>

        <div className="relative mb-6 aspect-square bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-900 to-purple-900 flex items-center justify-center">
            <div className="text-center text-white">
              <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Capture Love Moments</p>
              <p className="text-sm opacity-75">Earn LOVE tokens instantly</p>
            </div>
          </div>

          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <div className="bg-black/50 rounded-full p-2">
              <Heart className="w-4 h-4 text-rose-400" />
            </div>
            <div className="bg-black/50 rounded-full px-3 py-1">
              <span className="text-white text-xs font-medium">LOVE MODE</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-8">
          <button className={`w-12 h-12 ${cardBgClass} backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg`}>
            <Upload className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>

          <button
            onClick={handlePhotoCapture}
            disabled={isCapturing}
            className={`w-20 h-20 rounded-full shadow-xl transition-all duration-200 ${
              isCapturing
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 scale-95'
                : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:scale-105'
            }`}
          >
            <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center">
              <Camera className={`w-8 h-8 text-gray-700 ${isCapturing ? 'animate-pulse' : ''}`} />
            </div>
          </button>

          <button className={`w-12 h-12 ${cardBgClass} backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg`}>
            <MessageSquare className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>
        </div>
      </div>
    </div>
  );

  const GalleryInterface = () => (
    <div className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} overflow-y-auto`}>
      <div className="p-6 pb-24">
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
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <HomeInterface />;
      case 'rsvp': return <RSVPInterface />;
      case 'camera': return <CameraInterface />;
      case 'blockchain': return <BlockchainInterface />;
      case 'gallery': return <GalleryInterface />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className={`max-w-md mx-auto ${bgClass} min-h-screen relative overflow-hidden`}>
      <TokenReward show={recentPhoto} amount={25} />

      <div className="relative z-10 flex flex-col h-screen">
        {activeTab !== 'welcome' && <Header />}

        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>

        {activeTab !== 'welcome' && (
          <div className={`${darkMode ? 'bg-black/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'} backdrop-blur-sm border-t px-4 md:px-6 py-3 sticky bottom-0`}>
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
                  className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all ${
                    activeTab === id
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
        )}
      </div>
    </div>
  );
};

export default WeddingApp;
