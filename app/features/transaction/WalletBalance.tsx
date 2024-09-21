"use client"
import { useState, useEffect } from 'react';

const WalletBalance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    
    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'BALANCE_UPDATE') {
        // Update balance if the userId matches
        if (data.userId === 'some-user-id') {
          setBalance(data.newBalance);
        }
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => socket.close();
  }, []);

  return <h1>Current Balance: {balance}</h1>;
};

export default WalletBalance;
