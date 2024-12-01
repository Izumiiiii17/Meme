import React, { useState } from 'react';
import { Router, RouterConfig, Chains, SwapParams } from '@routerprotocol/asset-transfer-sdk-ts';
import axios from 'axios';

// Router API Configuration
const ROUTER_API_KEY = process.env.REACT_APP_ROUTER_API_KEY;
if (!ROUTER_API_KEY) {
  console.warn('Router API Key is not set. Some functionalities may be limited.');
}

const ROUTER_CONFIG: RouterConfig = {
  apiKey: ROUTER_API_KEY || '',
  environment: 'testnet',
};

const router = new Router(ROUTER_CONFIG);

// Define the URL for the Pathfinder API
const PATH_FINDER_API_URL = "https://api.pf.testnet.routerprotocol.com/api";

// Type definitions for quote parameters
interface QuoteParams {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
  fromTokenChainId: string;
  toTokenChainId: string;
  widgetId: number;
}

// Type definitions for quote data response
interface QuoteData {
  fromChainId: string;
  toChainId: string;
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
}

// Function to fetch the token list for a specific chain
export const getTokenList = async (chainId: Chains): Promise<any> => {
  try {
    const tokens = await router.getTokens(chainId);
    return tokens;
  } catch (error) {
    console.error('Error fetching token list:', error);
    throw error;
  }
};

// Function to request a quote from the Pathfinder API
export const getQuote = async (params: QuoteParams): Promise<QuoteData> => {
  const endpoint = "v2/quote";
  const quoteUrl = `${PATH_FINDER_API_URL}/${endpoint}`;

  try {
    const res = await axios.get(quoteUrl, { 
      params,
      headers: {
        'x-api-key': ROUTER_API_KEY,
      }
    });

    if (!res.data) {
      throw new Error('No quote data received');
    }

    return res.data;
  } catch (e) {
    console.error(`Error fetching quote data from Pathfinder:`, e);
    
    if (axios.isAxiosError(e)) {
      if (e.response) {
        console.error('Server responded with:', e.response.data);
        console.error('Status code:', e.response.status);
      } else if (e.request) {
        console.error('No response received');
      } else {
        console.error('Error setting up request:', e.message);
      }
    }

    throw e;
  }
};

// Function to perform a cross-chain swap
export const executeSwap = async (swapParams: SwapParams): Promise<any> => {
  try {
    const transaction = await router.swap(swapParams);
    return transaction;
  } catch (error) {
    console.error('Error executing swap:', error);
    throw error;
  }
};

// Function to initiate the token transfer by first getting a quote
export const initiateTransfer = async (quoteParams: QuoteParams & { fromAddress: string; toAddress: string }) => {
  try {
    // Step 1: Get the Quote for the token transfer
    const quoteData = await getQuote(quoteParams);
    console.log("Quote Data:", quoteData);

    // Step 2: Prepare Swap Params using the Quote Data
    const swapParams: SwapParams = {
      fromChainId: quoteData.fromChainId,
      toChainId: quoteData.toChainId,
      fromTokenAddress: quoteData.fromTokenAddress,
      toTokenAddress: quoteData.toTokenAddress,
      amount: quoteData.amount,
      fromAddress: quoteParams.fromAddress,
      toAddress: quoteParams.toAddress,
    };

    // Step 3: Execute the Swap
    const swapResult = await executeSwap(swapParams);
    console.log("Swap executed successfully:", swapResult);
    return swapResult;
  } catch (error) {
    console.error('Error initiating transfer:', error);
    throw error;
  }
};

// React component for token transfer
const RouterComponent: React.FC = () => {
  const [quoteParams, setQuoteParams] = useState<QuoteParams>({
    fromTokenAddress: "",
    toTokenAddress: "",
    amount: "",
    fromTokenChainId: "",
    toTokenChainId: "",
    widgetId: 0,
  });

  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInitiateTransfer = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate inputs before initiating transfer
      if (!fromAddress || !toAddress || !quoteParams.amount) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      const transferParams = {
        ...quoteParams,
        fromAddress,
        toAddress,
      };

      const result = await initiateTransfer(transferParams);
      console.log('Transfer successful:', result);
    } catch (error) {
      console.error('Transfer initiation failed:', error);
      setError('Transfer failed. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h1 className="text-xl font-bold">Router Protocol Token Transfer</h1>
      
      <input 
        type="text" 
        placeholder="From Token Address"
        value={quoteParams.fromTokenAddress}
        onChange={(e) => setQuoteParams({...quoteParams, fromTokenAddress: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input 
        type="text" 
        placeholder="To Token Address"
        value={quoteParams.toTokenAddress}
        onChange={(e) => setQuoteParams({...quoteParams, toTokenAddress: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input 
        type="text" 
        placeholder="Amount"
        value={quoteParams.amount}
        onChange={(e) => setQuoteParams({...quoteParams, amount: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input 
        type="text" 
        placeholder="From Token Chain ID"
        value={quoteParams.fromTokenChainId}
        onChange={(e) => setQuoteParams({...quoteParams, fromTokenChainId: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input 
        type="text" 
        placeholder="To Token Chain ID"
        value={quoteParams.toTokenChainId}
        onChange={(e) => setQuoteParams({...quoteParams, toTokenChainId: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input 
        type="text" 
        placeholder="From Wallet Address"
        value={fromAddress}
        onChange={(e) => setFromAddress(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input 
        type="text" 
        placeholder="To Wallet Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        className="w-full p-2 border rounded"
      />
      
      {error && (
        <div className="text-red-500 w-full text-center">
          {error}
        </div>
      )}
      
      <button
        onClick={handleInitiateTransfer}
        disabled={isLoading}
        className={`px-4 py-2 rounded-lg ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Processing...' : 'Initiate Transfer'}
      </button>
    </div>
  );
};

export default RouterComponent;