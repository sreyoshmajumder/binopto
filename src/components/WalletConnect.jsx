import React, { useEffect, useState } from 'react';

const WalletConnect = () => {
  const [address, setAddress] = useState(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAddress(window.ethereum.selectedAddress);
    }
    if (window.ethereum) {
      window.ethereum.on?.('accountsChanged', (accounts) => {
        setAddress(accounts?.[0] || null);
      });
    }
  }, []);

  const connect = async () => {
    try {
      if (!window.ethereum) {
        alert('No wallet found. Please install MetaMask or use a web3-enabled browser.');
        return;
      }
      setConnecting(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(accounts?.[0] || null);
    } catch (e) {
      alert(e?.message || 'Unable to connect wallet.');
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
  };

  if (!address) {
    return (
      <button
        onClick={connect}
        disabled={connecting}
        className="px-4 py-2 rounded-sm bg-primary text-white text-sm font-bold hover:bg-primary-light transition-all"
      >
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-corporate-text bg-white border border-corporate-border rounded-sm px-2 py-1">
        {address.slice(0, 6)}...{address.slice(-4)}
      </span>
      <button
        onClick={disconnect}
        className="px-3 py-2 rounded-sm bg-white border border-corporate-border text-corporate-text text-xs font-semibold hover:bg-white transition-all"
      >
        Disconnect
      </button>
    </div>
  );
};

export default WalletConnect;
