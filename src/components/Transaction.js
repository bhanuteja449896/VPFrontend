import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Transaction.css";
import { Transaction_API } from "./api";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const userMobile = localStorage.getItem("userMobile");

  // Function to convert UTC timestamp to IST
  const convertUTCtoIST = (utcTime) => {
    const utcDate = new Date(utcTime); // Convert UTC timestamp to Date object
    if (isNaN(utcDate.getTime())) {
      // If the conversion fails (invalid timestamp)
      return { date: "", time: "" };
    }
    const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000); // Convert to IST
    const date = istDate.toLocaleDateString("en-IN"); // Date in dd/mm/yyyy format
    const time = istDate.toLocaleTimeString("en-IN"); // Time in hh:mm:ss format
    return { date, time };
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

      // Convert timestamps to IST and separate Date and Time
      const formattedTransactions = sortedTransactions.map((transaction) => {
        // Ensure timestamp exists before attempting to convert
        if (transaction.timestamp) {
          const { date, time } = convertUTCtoIST(transaction.timestamp);
          return {
            ...transaction,
            date,
            time,
          };
        } else {
          return {
            ...transaction,
            date: "N/A", // Fallback if no timestamp
            time: "N/A",
          };
        }
      });

      setTransactions(formattedTransactions);
      setLoading(false); // Data fetched, set loading to false
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false); // In case of error, stop loading
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="transaction-container">
      <div className="transaction-list">
        {loading ? (
          <p>Loading...</p> // Display loading text until data is fetched
        ) : transactions.length > 0 ? (
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
                <p><strong>Date:</strong> {transaction.date}</p>
                <p><strong>Time:</strong> {transaction.time}</p>
                <p><strong>Type:</strong> {transaction.type}</p>
                {transaction.type === "Credit" ? (
                  <p><strong>From:</strong> {transaction.sender}</p>
                ) : (
                  <p><strong>To:</strong> {transaction.receiver}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-transactions">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default Transaction;
