import React, { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { TokenSelector } from './TokenSelector';

export function SwapInterface() {
  const [sourceToken, setSourceToken] = useState({
    symbol: 'ETH',
    icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png',
    balance: '0.1234',
  });

  const [destinationToken, setDestinationToken] = useState({
    symbol: 'USDC',
    icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdc.png',
    balance: '0.00',
  });

  const [swapAmount, setSwapAmount] = useState('');

  const handleMaxClick = () => {
    setSwapAmount(sourceToken.balance);
  };

  const handleSwap = () => {
    console.log('Swap initiated!');
    console.log('Source Token:', sourceToken);
    console.log('Destination Token:', destinationToken);
    console.log('Amount:', swapAmount);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-24 p-4">
      <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6">Swap Tokens</h2>

        {/* Token Selectors */}
        <div className="space-y-2">
          {/* Source Token */}
          <TokenSelector
            side="source"
            tokenSymbol={sourceToken.symbol}
            tokenIcon={sourceToken.icon}
            balance={sourceToken.balance}
            onMaxClick={handleMaxClick}
          />

          {/* Swap Button */}
          <div className="flex justify-center -my-3 relative z-10">
            <button
              className="
                bg-[#141414] p-2 rounded-lg border border-white/10
                hover:bg-[#1A1A1A] transition-colors
                text-[#00FF94] hover:text-[#00FF94]/80
              "
              aria-label="Swap tokens"
            >
              <ArrowDownUp className="w-5 h-5" />
            </button>
          </div>

          {/* Destination Token */}
          <TokenSelector
            side="destination"
            tokenSymbol={destinationToken.symbol}
            tokenIcon={destinationToken.icon}
            balance={destinationToken.balance}
          />
        </div>

        {/* Fee and Price Impact Details */}
        <div className="mt-6 space-y-4">
          <div className="bg-[#141414] rounded-lg p-3 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Estimated Gas Fee</span>
              <span>≈ $5.23</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Price Impact</span>
              <span className="text-[#00FF94]">0.05%</span>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            className="
              w-full py-4 rounded-xl font-semibold text-lg
              bg-gradient-to-r from-[#6B46C1] to-[#4F46E5]
              hover:from-[#7C3AED] hover:to-[#6366F1]
              text-white shadow-lg
              transition-all duration-200
              hover:shadow-[0_0_30px_rgba(0,255,148,0.2)]
              focus:outline-none focus:ring-2 focus:ring-[#00FF94]
            "
          >
            Swap Tokens
          </button>
        </div>
      </div>
    </div>
  );
}
