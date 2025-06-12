import React, { useState, useEffect } from 'react';
import { Camera, Heart, Trophy, Wallet, User, Upload, Gift, Star, Zap, Activity, Calendar, Users, QrCode, Bell, MapPin, Clock, Stethoscope, Plus, Minus, Send, MessageSquare } from 'lucide-react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [tokens, setTokens] = useState(250);
  const [isCapturing, setIsCapturing] = useState(false);
  const [recentPhoto, setRecentPhoto] = useState(false);
  const [rsvpCount, setRsvpCount] = useState(78);
  const [guestCount, setGuestCount] = useState(2);

  const coupleData = {
    bride: { name: "Sarah Johnson", profession: "Registered Nurse", avatar: "👩‍⚕️" },
    groom: { name: "Michael Chen", profession: "Blockchain Engineer", avatar: "👨‍💻" },
    weddingDate: "June 15, 2025",
    venue: "Garden Paradise Resort, Lagos"
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

  const VitalCard = ({ title, value, unit, icon: Icon, trend, color = "emerald" }:any) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 text-${color}-600`} />
        <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-700`}>
          {trend === 'up' ? '↗ Healthy' : trend === 'stable' ? '→ Stable' : '↓ Critical'}
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}{unit}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );

  const BlockchainTx = ({ type, amount, hash, status }:any) => (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-3 text-white mb-2">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${status === 'confirmed' ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
          <span className="text-sm font-medium">{type}</span>
        </div>
        <span className="text-xs text-gray-400">{status}</span>
      </div>
      <div className="text-lg font-bold text-green-400">+{amount} LOVE</div>
      <div className="text-xs text-gray-400 font-mono">Tx: {hash}</div>
    </div>
  );

  const TokenReward = ({ show, amount }:any) => (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
        <Star className="w-6 h-6 animate-spin" />
        <div>
          <div className="font-bold text-lg">+{amount} LOVE</div>
          <div className="text-xs opacity-90">Token Minted Successfully!</div>
        </div>
        <Zap className="w-6 h-6" />
      </div>
    </div>
  );

  const HomeInterface = () => (
    <div className="flex-1 bg-gradient-to-br from-rose-50 to-purple-50 relative overflow-hidden">
      {/* Romantic Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-pulse">💕</div>
        <div className="absolute top-40 right-16 text-4xl animate-bounce">✨</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-pulse">💖</div>
        <div className="absolute bottom-16 right-10 text-3xl">🌹</div>
      </div>

      <div className="relative z-10 p-6 pt-12">
        {/* Couple Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-rose-200/50">
          <div className="text-center mb-4">
            <div className="flex justify-center items-center space-x-4 mb-3">
              <div className="text-6xl">{coupleData.bride.avatar}</div>
              <div className="text-4xl animate-pulse">💕</div>
              <div className="text-6xl">{coupleData.groom.avatar}</div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              {coupleData.bride.name.split(' ')[0]} & {coupleData.groom.name.split(' ')[0]}
            </h1>
            <p className="text-gray-600 text-sm">{coupleData.bride.profession} × {coupleData.groom.profession}</p>
            <div className="flex items-center justify-center space-x-2 mt-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{coupleData.weddingDate}</span>
            </div>
          </div>
          
          {/* Love Contract */}
          <div className="bg-gradient-to-r from-purple-100 to-rose-100 rounded-xl p-4 border-l-4 border-purple-500">
            <h3 className="font-bold text-purple-900 mb-2 flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Smart Contract Vows
            </h3>
            <div className="space-y-1 text-sm text-purple-800">
              <div>• Promise to share dessert: <span className="font-mono bg-white px-2 py-1 rounded">FOREVER</span></div>
              <div>• Late night snack provision: <span className="font-mono bg-white px-2 py-1 rounded">IMMUTABLE</span></div>
              <div>• Love token supply: <span className="font-mono bg-white px-2 py-1 rounded">UNLIMITED</span></div>
            </div>
          </div>
        </div>

        {/* Wedding Vital Signs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Stethoscope className="w-5 h-5 text-emerald-600 mr-2" />
            <h2 className="text-lg font-bold text-gray-900">Wedding Vital Signs</h2>
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

        {/* Live Wedding Feed Preview */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
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
            <span className="text-sm text-gray-600">127 memories shared today</span>
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
    <div className="flex-1 bg-gray-50 p-6 pt-12">
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Users className="w-6 h-6 mr-2 text-purple-600" />
          Guest Management
        </h2>
        
        {/* RSVP Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{rsvpCount}</div>
            <div className="text-sm text-green-700">Confirmed</div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-xl">
            <div className="text-2xl font-bold text-amber-600">15</div>
            <div className="text-sm text-amber-700">Pending</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <div className="text-2xl font-bold text-red-600">7</div>
            <div className="text-sm text-red-700">Declined</div>
          </div>
        </div>

        {/* Guest Counter */}
        <div className="bg-gradient-to-r from-purple-100 to-rose-100 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">Your Guest Count</span>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-xl font-bold text-purple-900 min-w-[2rem] text-center">{guestCount}</span>
              <button 
                onClick={() => setGuestCount(guestCount + 1)}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Digital Prescription Invitation */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 mb-4">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">💊</div>
            <h3 className="font-bold text-lg text-gray-900">Digital Prescription</h3>
            <p className="text-sm text-gray-600">Dr. Love's Wedding Remedy</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 font-mono text-sm mb-4">
            <div><strong>Patient:</strong> Wedding Guest</div>
            <div><strong>Prescription:</strong> Take 1 celebration</div>
            <div><strong>Instructions:</strong> Mix with dancing, repeat as needed</div>
            <div><strong>Side Effects:</strong> Extreme joy, spontaneous crying</div>
            <div><strong>Refills:</strong> Unlimited memories</div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2">
            <QrCode className="w-5 h-5" />
            <span>Generate QR Invitation</span>
          </button>
        </div>
      </div>
    </div>
  );

  const BlockchainInterface = () => (
    <div className="flex-1 bg-gray-50 p-6 pt-12">
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

      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
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

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Redemption Store</h3>
        <div className="space-y-3">
          {[
            { item: 'MTN Airtime ₦500', cost: 100, icon: '📱', available: true },
            { item: 'Data Bundle 1GB', cost: 150, icon: '📶', available: true },
            { item: 'Wedding Photo NFT', cost: 200, icon: '🖼️', available: tokens >= 200 }
          ].map((reward, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${reward.available ? 'bg-gray-50 border-gray-200' : 'bg-gray-100 border-gray-300 opacity-50'}`}>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{reward.icon}</span>
                <span className="font-medium text-gray-900">{reward.item}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 font-mono">{reward.cost} LOVE</span>
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
  );

  const CameraInterface = () => (
    <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-50 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
      
      <div className="relative z-10 p-6 pt-12">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Live Wedding 💒</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full px-4 py-2 shadow-sm">
            <div className="flex items-center space-x-2 text-white">
              <Star className="w-4 h-4" />
              <span className="font-bold">{tokens}</span>
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
      </div>

      <div className="relative mx-6 mb-6 aspect-square bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
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

      <div className="px-6 pb-24">
        <div className="flex items-center justify-center space-x-8">
          <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
            <Upload className="w-6 h-6 text-gray-700" />
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
          
          <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
            <MessageSquare className="w-6 h-6 text-gray-700" />
          </button>
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
      default: return <HomeInterface />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      <TokenReward show={recentPhoto} amount={25} />

      <div className="relative z-10 flex flex-col h-screen">
        {renderContent()}

        <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200/50 px-6 py-3">
          <div className="flex items-center justify-around">
            {[
              { id: 'home', icon: Heart, label: 'Love', color: 'rose' },
              { id: 'rsvp', icon: Users, label: 'RSVP', color: 'purple' },
              { id: 'camera', icon: Camera, label: 'Capture', color: 'pink' },
              { id: 'blockchain', icon: Wallet, label: 'Wallet', color: 'amber' },
              { id: 'profile', icon: User, label: 'Profile', color: 'gray' }
            ].map(({ id, icon: Icon, label, color }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all ${
                  activeTab === id 
                    ? `bg-gradient-to-r from-${color}-500 to-${color}-600 text-white shadow-lg` 
                    : `text-gray-600 hover:text-${color}-600`
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;