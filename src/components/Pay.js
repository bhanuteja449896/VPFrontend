import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Home.css';

import { Balance_API } from './api';
import { Payment_API } from './api';

const Pay = () => {
  const [balance, setBalance] = useState(0);
  const [receiverMobile, setReceiverMobile] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const userMobile = localStorage.getItem('userMobile');

  // Fetch balance on component mount and whenever refresh is clicked
  const fetchBalance = async () => {
    try {
      const url = `${Balance_API}/${userMobile}/balance`;
      const response = await axios.get(url);
      console.log(response.data);
      setBalance(response.data);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setStatus('Failed to fetch balance.');
      setTimeout(() => setStatus(''), 5000); // Clear status after 5 seconds
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!receiverMobile || !amount) {
      setStatus('Please enter receiver mobile number and amount.');
      setTimeout(() => setStatus(''), 5000);
      return;
    }

    setLoading(true); // Start loading
    try {
      const url = `${Payment_API}/${userMobile}/${receiverMobile}/${amount}`;
      const response = await axios.get(url);
      console.log(response.data);
      if (response.data.rc === '00') {
        setStatus(response.data.desc);
        fetchBalance(); // Refresh balance after payment
      } else {
        setStatus(`Payment failed: ${response.data.desc}`);
      }
    } catch (error) {
      console.error('Error making payment:', error);
      setStatus('Payment failed. Please try again.');
    } finally {
      setLoading(false); // Stop loading
      setTimeout(() => setStatus(''), 5000); // Clear status after 5 seconds
    }
  };

  return (
    <>
      <div className="balance-container">
        <div className="balance-box">
          <span>{balance}</span>
        </div>
        <button onClick={fetchBalance} className="refresh-btn">
          Refresh
        </button>
      </div>

      {/* Payment Form */}
      <div className="payment-container">
        <h2>Send Money</h2>
        <form onSubmit={handlePayment}>
          <div className="input-group">
            <label htmlFor="receiverMobile">Receiver Mobile Number</label>
            <input
              type="text"
              id="receiverMobile"
              placeholder="Enter receiver's mobile number"
              value={receiverMobile}
              onChange={(e) => setReceiverMobile(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="send-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Send'}
          </button>
        </form>

        {status && <p className="status-message">{status}</p>}
      </div>
    </>
  );
};

export default Pay;