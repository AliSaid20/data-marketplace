// import React from 'react'
import React, { useState } from 'react';
import '../App/SellerApproveSubmit.css';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "./AppContext";

const SellerApproveSubmit = () => {
    
    const [license, setLicense] = useState(null);
    const { addSubmission } = useAppContext();
    const navigate = useNavigate();
  
    const handleSubmit = () => {
      const reader = new FileReader();
  reader.onload = () => {
      const newSubmission = {
        id: Date.now(), // Unique ID based on timestamp
        name: "Seller Name", // Replace with dynamic data
        email: "seller@example.com", // Replace with dynamic data
        proof: reader.result, // File name
        status: "pending",
      };
  
      addSubmission(newSubmission);
      alert("Submission received. Please wait for admin approval.");
      navigate("/main-home");
    };

    if (license) {
      reader.readAsDataURL(license); // Convert file to Base64
    }
  }


  return (
    <div className='fully-wrapp'>
        <div className="seller-approval2">
        <h2>Seller Approval</h2>
        <p>Please upload your license or proof for verification.</p>
        <input
        type="file"
        onChange={(e) => setLicense(e.target.files[0])}
        accept="image/*,application/pdf"
        />
        <button className='seller-approving' onClick={handleSubmit} disabled={!license}>
        Submit
        </button>
        </div>
    </div>
  )
}

export default SellerApproveSubmit
