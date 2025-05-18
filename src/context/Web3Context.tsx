import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42] // Ethereum mainnet and testnets
});

interface Web3ContextType {
  connect: () => Promise<void>;
  disconnect: () => void;
  account: string | null | undefined;
  balance: string;
  isConnected: boolean;
}

const Web3Context = createContext<Web3ContextType>({
  connect: async () => {},
  disconnect: () => {},
  account: null,
  balance: '0',
  isConnected: false,
});

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { activate, deactivate, account, library } = useWeb3React();
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    try {
      await activate(injected);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const disconnect = () => {
    try {
      deactivate();
      setIsConnected(false);
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  useEffect(() => {
    const getBalance = async () => {
      if (account && library) {
        const balance = await library.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
      }
    };

    getBalance();
  }, [account, library]);

  return (
    <Web3Context.Provider
      value={{
        connect,
        disconnect,
        account,
        balance,
        isConnected,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context); 