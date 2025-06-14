import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BottomNavigation from '../components/NavBar';
import Header from '../components/Header';
import BlockchainTx from '../components/BlockchainTx';




const BlockchainPage = ({ darkMode, setDarkMode }: any) => {
  const [tokens] = useState(250);
  const [userName] = useState('Guest');
  const [expandedReward, setExpandedReward] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedDataBundle, setSelectedDataBundle] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-white text-sm' : 'text-gray-900 text-sm';
  const cardBgClass = darkMode ? 'bg-gray-800/80' : 'bg-white/80';

  const networks = [
    { id: 'mtn', name: 'MTN', color: 'bg-yellow-500' },
    { id: 'glo', name: 'GLO', color: 'bg-green-500' },
    { id: 'airtel', name: 'AIRTEL', color: 'bg-red-500' },
    { id: '9mobile', name: '9MOBILE', color: 'bg-green-600' }
  ];

  // Data bundles with actual VTU.ng variation IDs and estimated token prices
  const dataBundles:any = {
    mtn: [
      { variation_id: '5506674', description: '1GB + 1.5 mins - 1 Day', price: 30, nairaPrice: 300 },
      { variation_id: '2676', description: '1GB + 5 mins - 7 Days', price: 35, nairaPrice: 350 },
      { variation_id: '244542', description: '2GB + 2 mins - 30 Days', price: 60, nairaPrice: 600 },
      { variation_id: '5506738', description: '3.5GB + 5 mins - 30 Days', price: 90, nairaPrice: 900 },
      { variation_id: '244538', description: '7GB - 30 Days', price: 150, nairaPrice: 1500 },
      { variation_id: '2677', description: '10GB + 10 mins - 30 Days', price: 200, nairaPrice: 2000 },
      { variation_id: '244540', description: '16.5GB - 30 Days', price: 320, nairaPrice: 3200 },
      { variation_id: '2673', description: '36GB - 30 Days', price: 650, nairaPrice: 6500 },
      { variation_id: '2667', description: '75GB - 30 Days', price: 1200, nairaPrice: 12000 }
    ],
    glo: [
      { variation_id: '5580758', description: '125MB - 1 Day', price: 15, nairaPrice: 150 },
      { variation_id: '2251529', description: '500MB (SME) - 30 Days', price: 25, nairaPrice: 250 },
      { variation_id: '2251528', description: '1GB (SME) - 30 Days', price: 35, nairaPrice: 350 },
      { variation_id: '2666', description: '1.5GB - 14 Days', price: 45, nairaPrice: 450 },
      { variation_id: '5580757', description: '1.75GB - Sunday', price: 50, nairaPrice: 500 },
      { variation_id: '244659', description: '2.2GB - Weekend', price: 60, nairaPrice: 600 },
      { variation_id: '2251526', description: '2GB (SME) - 30 Days', price: 65, nairaPrice: 650 },
      { variation_id: '2660', description: '2.6GB - 30 Days', price: 75, nairaPrice: 750 },
      { variation_id: '2251525', description: '3GB (SME) - 30 Days', price: 90, nairaPrice: 900 },
      { variation_id: '244658', description: '5GB - 30 Days', price: 130, nairaPrice: 1300 },
      { variation_id: '2251523', description: '5GB (SME) - 30 Days', price: 140, nairaPrice: 1400 },
      { variation_id: '244668', description: '7.5GB - 30 Days', price: 180, nairaPrice: 1800 },
      { variation_id: '2251521', description: '10GB (SME) - 30 Days', price: 250, nairaPrice: 2500 },
      { variation_id: '2665', description: '11GB - 30 Days', price: 280, nairaPrice: 2800 },
      { variation_id: '2663', description: '18GB - 30 Days', price: 450, nairaPrice: 4500 },
      { variation_id: '2661', description: '40GB - 30 Days', price: 900, nairaPrice: 9000 }
    ],
    airtel: [
      { variation_id: '244698', description: '1GB - 7 Days', price: 35, nairaPrice: 350 },
      { variation_id: '2672', description: '2GB - 30 Days', price: 60, nairaPrice: 600 },
      { variation_id: '244721', description: '3GB - 30 Days', price: 85, nairaPrice: 850 },
      { variation_id: '2675', description: '6GB - 30 Days', price: 150, nairaPrice: 1500 },
      { variation_id: '2674', description: '10GB - 30 Days', price: 240, nairaPrice: 2400 },
      { variation_id: '2670', description: '18GB - 30 Days', price: 420, nairaPrice: 4200 },
      { variation_id: '2669', description: '35GB - 30 Days', price: 800, nairaPrice: 8000 },
      { variation_id: '2668', description: '60GB - 30 Days', price: 1300, nairaPrice: 13000 }
    ],
    '9mobile': [
      { variation_id: '2664', description: '1.4GB - 30 Days', price: 40, nairaPrice: 400 },
      { variation_id: '2787', description: '2.44GB - 30 Days', price: 70, nairaPrice: 700 },
      { variation_id: '2662', description: '3.91GB - 30 Days', price: 110, nairaPrice: 1100 },
      { variation_id: '2793', description: '5.10GB - 30 Days', price: 140, nairaPrice: 1400 },
      { variation_id: '2792', description: '16GB - 30 Days', price: 400, nairaPrice: 4000 },
      { variation_id: '2791', description: '78GB - 90 Days', price: 1500, nairaPrice: 15000 }
    ]
  };

  const rewards = [
    { item: 'Airtime ₦1000:', cost: 100, icon: '📱', available: true, type: 'airtime' },
    { item: 'Data Bundle 1GB:', cost: 150, icon: '📶', available: true, type: 'data' }
  ];

  // Calculate available airtime/data based on tokens
  const calculateAirtimeAmount = (userTokens: any) => {
    // 100 tokens = ₦1000, so 1 token = ₦10
    selectedDataBundle;
    return (userTokens * 10);
  };

  const handleRewardClick = (index: any, reward: any) => {
    if (!reward.available) return;

    if (expandedReward === index) {
      setExpandedReward(null);
      setSelectedNetwork('');
      setSelectedDataBundle(null);
    } else {
      setExpandedReward(index);
      setSelectedNetwork('');
      setSelectedDataBundle(null);
    }
  };

  const handleNetworkSelect = (networkId: any) => {
    setSelectedNetwork(networkId);
    setSelectedDataBundle(null);
  };

  const handleAirtimePurchase = async (networkId: any) => {
    setIsProcessing(true);

    const airtimeAmount = calculateAirtimeAmount(tokens);
    const phoneNumber = '09078099974';

    // VTU.ng API call for airtime purchase  
   // const apiUrl: string = `https://vtu.ng/wp-json/api/v1/airtime?username=Frank&password=123456&phone=${phoneNumber}&network_id=${networkId}&amount=${airtimeAmount}`;

    try {
      // Make actual API call (uncomment for production)
      // const response = await fetch(apiUrl);
      // const result = await response.json();

      // Mock response for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockResult = {
        code: "success",
        message: "Airtime successfully delivered",
        data: {
          network: networkId.toUpperCase(),
          phone: phoneNumber,
          amount: `NGN${airtimeAmount}`,
          order_id: Math.floor(Math.random() * 9999).toString()
        }
      };

      if (mockResult.code === "success") {
        alert(`✅ Airtime Purchase Successful!\n\nNetwork: ${mockResult.data.network}\nPhone: ${mockResult.data.phone}\nAmount: ${mockResult.data.amount}\nOrder ID: ${mockResult.data.order_id}\nTokens Used: ${tokens} LOVE`);
        setExpandedReward(null);
      } else {
        alert(`❌ Purchase Failed!\n${mockResult.message}\nOrder ID: ${mockResult.data.order_id || 'N/A'}`);
      }
    } catch (error) {
      alert('❌ Network error. Please check your internet connection and try again.');
      console.error('API Error:', error);
    }

    setIsProcessing(false);
  };

  const handleDataPurchase = async (bundle: any) => {
    setIsProcessing(true);

    const phoneNumber = '09078099974';

    // VTU.ng API call for data purchase
   // const apiUrl: string = `https://vtu.ng/wp-json/api/v1/data?username=Frank&password=123456&phone=${phoneNumber}&network_id=${selectedNetwork}&variation_id=${bundle.variation_id}`;

    try {
      // Make actual API call (uncomment for production)
      // const response = await fetch(apiUrl);
      // const result = await response.json();

      // Mock response for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockResult = {
        code: "success",
        message: "Data successfully delivered",
        data: {
          network: selectedNetwork.toUpperCase(),
          data_plan: bundle.description,
          phone: phoneNumber,
          amount: `NGN${bundle.nairaPrice}`,
          order_id: Math.floor(Math.random() * 9999).toString()
        }
      };

      if (mockResult.code === "success") {
        alert(`✅ Data Purchase Successful!\n\nNetwork: ${mockResult.data.network}\nPlan: ${mockResult.data.data_plan}\nPhone: ${mockResult.data.phone}\nAmount: ${mockResult.data.amount}\nOrder ID: ${mockResult.data.order_id}\nTokens Used: ${bundle.price} LOVE`);
        setExpandedReward(null);
        setSelectedNetwork('');
      } else {
        alert(`❌ Purchase Failed!\n${mockResult.message}\nOrder ID: ${mockResult.data.order_id}`);
      }
    } catch (error) {
      alert('❌ Network error. Please check your internet connection and try again.');
      console.error('API Error:', error);
    }

    setIsProcessing(false);
  };

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
              <div className="text-sm text-green-300 mt-2">
                Worth: ₦{calculateAirtimeAmount(tokens).toLocaleString()}
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
              {rewards.map((reward, i) => (
                <div key={i}>
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${reward.available
                        ? `${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`
                        : `${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'} opacity-50`
                      } ${expandedReward === i ? 'ring-2 ring-purple-500' : ''}`}
                    onClick={() => handleRewardClick(i, reward)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{reward.icon}</span>
                      <div>
                        <span className={`font-medium ${textClass}`}>{reward.item}</span>
                        {reward.type === 'airtime' && (
                          <div className="text-xs text-green-500">
                            You can get ₦{calculateAirtimeAmount(tokens).toLocaleString()} airtime
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-900'} font-mono`}>
                        {reward.cost} LOVE
                      </span>
                      {expandedReward === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Dropdown content */}
                  {expandedReward === i && (
                    <div className={`mt-3 p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-25'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <div className="mb-3">
                        <span className={`text-sm font-medium ${textClass}`}>Select Network:</span>
                      </div>

                      {/* Network selection */}
                      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                        {networks.map((network) => (
                          <button
                            key={network.id}
                            onClick={() => handleNetworkSelect(network.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedNetwork === network.id
                                ? `${network.color} text-white shadow-lg`
                                : `${darkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                              }`}
                          >
                            {network.name}
                          </button>
                        ))}
                      </div>

                      {/* Phone number display */}
                      <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="text-sm text-blue-700">
                          <strong>Phone Number:</strong> 09078099974
                        </div>
                      </div>

                      {/* Airtime purchase */}
                      {reward.type === 'airtime' && selectedNetwork && (
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                            <div className="text-sm text-green-700">
                              <strong>Available Amount:</strong> ₦{calculateAirtimeAmount(tokens).toLocaleString()}
                            </div>
                          </div>
                          <button
                            onClick={() => handleAirtimePurchase(selectedNetwork)}
                            disabled={isProcessing}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                          >
                            {isProcessing ? 'Processing...' : `Purchase Airtime for ${selectedNetwork.toUpperCase()}`}
                          </button>
                        </div>
                      )}

                      {/* Data bundle selection */}
                      {reward.type === 'data' && selectedNetwork && (
                        <div className="space-y-3">
                          <div className="mb-3">
                            <span className={`text-sm font-medium ${textClass}`}>Select Data Bundle:</span>
                          </div>
                          <div className="max-h-48 overflow-y-auto space-y-2">
                            {dataBundles[selectedNetwork]?.map((bundle: any, idx: any) => {
                              const canAfford = tokens >= bundle.price;
                              return (
                                <div
                                  key={idx}
                                  className={`p-3 rounded-lg border cursor-pointer transition-all ${canAfford
                                      ? `${darkMode ? 'bg-gray-600 border-gray-500 hover:bg-gray-550' : 'bg-white border-gray-200 hover:bg-gray-50'}`
                                      : 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed'
                                    }`}
                                  onClick={() => canAfford && handleDataPurchase(bundle)}
                                >
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <div className={`font-medium ${textClass}`}>{bundle.description}</div>
                                      <div className="text-xs text-gray-500">{selectedNetwork.toUpperCase()}</div>
                                    </div>
                                    <div className="text-right">
                                      <div className={`font-bold ${canAfford ? 'text-green-600' : 'text-red-500'}`}>
                                        {bundle.price} LOVE
                                      </div>
                                      <div className="text-xs text-gray-500">₦{bundle.nairaPrice}</div>
                                    </div>
                                  </div>
                                  {!canAfford && (
                                    <div className="text-xs text-red-500 mt-1">Insufficient tokens</div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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