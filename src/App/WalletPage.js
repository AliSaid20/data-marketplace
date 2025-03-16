// import React from 'react'
import React, { useState } from "react";
import { useAppContext } from "./AppContext";
import "../App/WalletPage.css";

const WalletPage = () => {


    const { walletTransactions, addTransaction, accountDetails, updateAccountDetails } = useAppContext();
    const [redeemAmount, setRedeemAmount] = useState(0);


    const currentBalance = 
    walletTransactions
    .filter((txn) => txn.type === "payment")
    .reduce((sum, txn) => sum + txn.amount, 0) -
    walletTransactions
      .filter((txn) => txn.type === "redeem")
      .reduce((sum, txn) => sum + txn.amount, 0);

    const isAccountDetailsFilled = Object.values(accountDetails).every(
      (detail) => detail.trim() !== ""
    );

    const handleRedeem = () => {


      if (!isAccountDetailsFilled) {
        alert("Please fill in all account details before redeeming funds.");
        return;
      }

      if (redeemAmount > 0 && redeemAmount <= currentBalance) {
        // Deduct from balance and add transaction
        addTransaction({
          type: "redeem",
          amount: Number(redeemAmount),
          date: new Date().toLocaleString(),
          status: "Pending",
        });
  
        // alert(`Redeemed $${redeemAmount}.`);
        setRedeemAmount(0);
      } else {
        alert("Enter a valid amount.");
      }
    };
  
    const handleAccountUpdate = (e) => {
      e.preventDefault();
      updateAccountDetails(accountDetails);
      alert("Account details updated.");
    };
  
 


        
        console.log("Wallet Transactions:", walletTransactions);

  return (
    <div className="wallet-page">
      <h1>Seller Wallet</h1>
      <div className="wallet-balance">
        <h2>Current Balance: ${currentBalance.toFixed(2)}</h2>
      </div>

      <div className="redeem-section">
        <h3>Redeem Funds</h3>
        {currentBalance <= 0 ? (
            <p className="wallet-empty-message">Wallet is empty. No funds available to redeem.</p>
        ) : (
        <>
        <input
          type="number"
          value={redeemAmount}
          placeholder="Enter amount to redeem"
          min="1"
          onChange={(e) => setRedeemAmount(Number(e.target.value))}
        />
        <button onClick={handleRedeem}>Redeem</button>
        </>
         )}
      </div>
      <div className="account-section">
        <h3>Account Details</h3>
        <form onSubmit={handleAccountUpdate}>
          <input
            type="text"
            value={accountDetails.accountNumber}
            onChange={(e) =>
              updateAccountDetails({
                ...accountDetails,
                accountNumber: e.target.value,
              })
            }
            placeholder="Account Number"
            required
          />
          <input
            type="text"
            value={accountDetails.bankName}
            onChange={(e) =>
              updateAccountDetails({
                ...accountDetails,
                bankName: e.target.value,
              })
            }
            placeholder="Bank Name"
            required
          />
            <input
            type="text"
            value={accountDetails.ifscCode}
            onChange={(e) =>
              updateAccountDetails({
                ...accountDetails,
                ifscCode: e.target.value,
              })
            }
            placeholder="IFSC code"
            required
          />
          <button type="submit">Save Details</button>
        </form>
      </div>

      <div className="transaction-history">
        <h3>Transaction History</h3>
        {walletTransactions.length > 0 ? (
          walletTransactions.map((txn, index) => (
            <div key={index} className={`transaction ${txn.type}`}>
              <p>
                <strong>{txn.type === "payment" ? "Received" : "Redeemed"}:</strong> $
                {txn.amount.toFixed(2)} on {txn.date}
              </p>
              <p>Status: {txn.status}</p>
            </div>
          ))
        ) : (
          <p>No transactions yet.</p>
        )}
      </div>
    </div>
  )
}

export default WalletPage
