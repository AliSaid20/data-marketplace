import React from 'react'
// import React, { useState, useEffect } from "react";
import '../App/SellerApproval.css';
import { useAppContext } from "./AppContext";

// const dummySellerSubmissions = [
//   { id: 1, name: "Alice", email: "alice@example.com", proof: "document1.pdf", status: "pending" },
//   { id: 2, name: "Bob", email: "bob@example.com", proof: "document2.pdf", status: "pending" },
//   { id: 3, name: "Charlie", email: "charlie@example.com", proof: "document3.pdf", status: "approved" },
// ];

const SellerApproval = () => {

  const {sellerSubmissions, updateSubmissionStatus} = useAppContext();

  const handleApprove = (id) => {
    updateSubmissionStatus(id, "approved");
    alert(`Seller with ID ${id} approved.`);
  };

  const handleReject = (id) => {
    updateSubmissionStatus(id, "rejected");
    alert(`Seller with ID ${id} rejected.`);
  };

  const handleRemoveFromSelling = (id) => {
    updateSubmissionStatus(id, "removed");
    alert(`Seller with ID ${id} removed from selling.`);
  };

  return (
    <div className="seller-approval">
    <table className="seller-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Proof Document</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sellerSubmissions.map((submission) => (
          <tr key={submission.id}>
            <td>{submission.id}</td>
            <td>{submission.name}</td>
            <td>{submission.email}</td>
            <td>
            {submission.proof && (
                <a href={submission.proof} target="_blank" rel="noopener noreferrer">
                  View Proof
                </a>
              )}
            </td>
            <td>{submission.status}</td>
            <td>
              {submission.status === "pending" && (
                <>
                  <button
                    onClick={() => handleApprove(submission.id)}
                    className="approve-button"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(submission.id)}
                    className="reject-button"
                  >
                    Reject
                  </button>
                </>
              )}
              {submission.status === "approved" && (
                  <button
                    onClick={() => handleRemoveFromSelling(submission.id)}
                    className="remove-button"
                  >
                    Remove from Selling
                  </button>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  )
}

export default SellerApproval
