import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Transaction.css";
import { Transaction_API } from "./api";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const userMobile = localStorage.getItem("userMobile");

  // Function to convert UTC timestamp to IST
  const convertUTCtoIST = (utcTime) => {
    const utcDate = new Date(utcTime);
    const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);
    return istDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  // Fetch transaction data
  const fetchTransactions = async () => {
    try {
      const url = `${Transaction_API}/${userMobile}`;
      const response = await axios.get(url);
      console.log(response.data);

      // Sort transactions by timestamp (latest first)
      const sortedTransactions = response.data.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      // Convert timestamps to IST
      const formattedTransactions = sortedTransactions.map((transaction) => ({
        ...transaction,
        timestamp: convertUTCtoIST(transaction.timestamp),
      }));

      setTransactions(formattedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="transaction-container">
      <h1>Transactions</h1>
      <div className="transaction-list">
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <div
              key={index}
              className={`transaction-item ${
                transaction.type === "Credit" ? "credit" : "debit"
              }`}
            >
              <div className="transaction-details">
                <p><strong>Amount:</strong> {transaction.amount}</p>
                <p><strong>Status:</strong> {transaction.status}</p>
                <p><strong>Time:</strong> {transaction.timestamp}</p>
                <p>
                  <strong>Type:</strong> {transaction.type} -{" "}
                  {transaction.type === "Credit"
                    ? `Received from ${transaction.sender}`
                    : `Sent to ${transaction.receiver}`}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default Transaction;
