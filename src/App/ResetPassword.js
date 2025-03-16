import React, { useState } from 'react';

import '../App/ResetPassword.css';

const ResetPassword = () => {

const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);



  return (
    <>
    <div className="forgot-password">
      <span onClick={openModal} className="forgot-password-link">Forgot Password?</span>
    </div>
    {isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <h2>Reset Password</h2>
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
            <button type="submit" className="auth-button">Send Reset Link</button>
          </form>
          <button onClick={closeModal} className="close-modal">Close</button>
        </div>
      </div>
    )}
  </>
    )
}

export default ResetPassword
