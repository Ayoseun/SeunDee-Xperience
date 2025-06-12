import { useState } from 'react';

import Header from '../components/Header';
import BlockchainTx from '../components/BlockchainTx';
import BottomNavigation from '../components/NavBar';

const BlockchainPage = ({darkMode,setDarkMode}:any) => {

  const [tokens] = useState(250);
  const [userName] = useState('Guest');



  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const cardBgClass = darkMode ? 'bg-gray-800/80' : 'bg-white/80';

  return (
    <div className={`max-w-md mx-auto ${bgClass} min-h-screen `}>
<Header darkMode={darkMode} setDarkMode={setDarkMode} tokens={tokens} userName={userName} />

      <div className={`flex-1 ${bgClass} overflow-y-auto`}>
        <div className="p-6 pb-8">
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
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${reward.available
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
      <BottomNavigation activeTab="blockchain" darkMode={darkMode} />
    </div>
  );
};

export default BlockchainPage;
