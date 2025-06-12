interface BlockchainTxProps {
  type: string;
  amount: string;
  hash: string;
  status: string;
}

const BlockchainTx = ({ type, amount, hash, status }: BlockchainTxProps) => {
  return (
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
};

export default BlockchainTx;
