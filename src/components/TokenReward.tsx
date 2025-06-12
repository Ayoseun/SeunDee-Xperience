import { Star, Zap } from 'lucide-react';

interface TokenRewardProps {
  show: boolean;
  amount: number;
}

const TokenReward = ({ show, amount }: TokenRewardProps) => {
  return (
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
};

export default TokenReward;
