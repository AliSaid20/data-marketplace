// import React from 'react'
import React, { useState } from 'react';

import ManageUsers from './ManageUsers';
import SellerApproval from './SellerApproval';
import FeedbackManagement from './FeedbackManagement';
import Analytics from './Analytics';
import Settings from './Settings';

import '../App/AdminPage.css';

const AdminPage = ({ setLoggedIn }) => {


    const [activeSection, setActiveSection] = useState('manage-users'); // Default section

    // Change active section when sidebar option is clicked
    const handleSectionChange = (section) => {
      setActiveSection(section);
    };

      // Render the corresponding component based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case 'manage-users':
        return <ManageUsers />;
      case 'seller-approval':
        return <SellerApproval />;
      case 'feedback-management':
        return <FeedbackManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings setLoggedIn={setLoggedIn} />;
      default:
        return <ManageUsers />;
    }
  };

  return (
    <div className='admin-wrapper'>
    <div className="admin-container-main">
    <div className="sidebar-admin">
      <h2>Admin Dashboard</h2>
      <ul>
        <li onClick={() => handleSectionChange('manage-users')}>Manage Users</li>
        <li onClick={() => handleSectionChange('seller-approval')}>Seller Approval</li>
        <li onClick={() => handleSectionChange('feedback-management')}>Manage Feedback</li>
        <li onClick={() => handleSectionChange('analytics')}>Analytics</li>
        <li onClick={() => handleSectionChange('settings')}>Settings</li>
      </ul>
    </div>
    
    <div className="main-content-admin">
      <h1>{activeSection.replace('-', ' ').toUpperCase()}</h1>
      {renderContent()}
    </div>
    </div>
    </div>
  )
}

export default AdminPage
