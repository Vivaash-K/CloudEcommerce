import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const PaymentPage: React.FC = () => {
  const { connect, disconnect, account, balance, isConnected } = useWeb3();
  const { cart } = useStore();
  const [error, setError] = useState('');

  // Calculate total from cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price || 0) * item.quantity;
    }, 0);
  };

  const total = calculateTotal();

  const handlePayment = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Convert USD to ETH (you'll need to implement actual conversion rate)
      const ethAmount = (total / 2000).toString(); // Example conversion rate

      const tx = await signer.sendTransaction({
        to: '0xYourStoreAddress', // Replace with your store's Ethereum address
        value: ethers.utils.parseEther(ethAmount),
      });

      await tx.wait();
      alert('Payment successful!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Ethereum Payment
        </Typography>

        <Typography variant="h6" gutterBottom>
          Total Amount: ${total.toFixed(2)}
        </Typography>

        {!isConnected ? (
          <Button
            variant="contained"
            color="primary"
            onClick={connect}
            fullWidth
          >
            Connect MetaMask
          </Button>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Connected Account: {account}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Balance: {balance} ETH
            </Typography>

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handlePayment}
              fullWidth
              sx={{ mt: 2 }}
            >
              Pay with ETH
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={disconnect}
              fullWidth
              sx={{ mt: 2 }}
            >
              Disconnect
            </Button>
          </>
        )}

        <Button
          component={Link}
          to="/cart"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
        >
          Back to Cart
        </Button>
      </Paper>
    </Box>
  );
};

export default PaymentPage; 