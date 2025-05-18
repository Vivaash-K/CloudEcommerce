import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';

const PaymentPage: React.FC = () => {
  const { connect, disconnect, account, balance, isConnected } = useWeb3();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');

  const handlePayment = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed/active');
      }

      if (!amount || !recipient) {
        throw new Error('Please fill in all fields');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount),
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
              Welcome to the payment page. Buy your favorite products using your Sepolia Ethereum crypto currency tokens via Blockchain.
            </Typography>

            <TextField
              label="Amount (ETH)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              margin="normal"
              type="number"
            />

            <TextField
              label="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              fullWidth
              margin="normal"
            />

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
              Send Payment
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
      </Paper>
    </Box>
  );
};

export default PaymentPage; 