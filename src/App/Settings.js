// import React from 'react'
import React, { useState } from 'react';
import '../App/Settings.css';
import { useNavigate } from 'react-router-dom';


const Settings = ({ setLoggedIn }) => {
  

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: 'Admin',
    email: 'admin.login@gmail.com',
    password: '',
  });

  const [appSettings, setAppSettings] = useState({
    theme: 'light', // Options: 'light', 'dark'
    notifications: true,
    sellerRegistration: true,
    feedbackVisibility: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAppSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetSettings = () => {
    setAppSettings({
      theme: 'light',
      notifications: true,
      sellerRegistration: true,
      feedbackVisibility: true,
    });
    alert('Settings have been reset to default.');
  };

  const saveSettings = () => {
    alert('Settings saved successfully!');
    console.log({ profile, appSettings }); // Simulate saving settings
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    setLoggedIn(false); // Update loggedIn state
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="settings-page">

    {/* Profile Settings */}
    <section className="settings-section">
      <h2>Profile Settings</h2>
      <div className="settings-form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleProfileChange}
        />
      </div>
      <div className="settings-form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleProfileChange}
        />
      </div>
      <div className="settings-form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="New password"
          value={profile.password}
          onChange={handleProfileChange}
        />
      </div>
    </section>

    {/* Application Settings */}
    <section className="settings-section">
      <h2>Application Settings</h2>
      <div className="settings-form-group">
        <label>Theme:</label>
        <select
          name="theme"
          value={appSettings.theme}
          onChange={handleAppSettingsChange}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="settings-form-group">
        <label>
          <input
            type="checkbox"
            name="notifications"
            checked={appSettings.notifications}
            onChange={handleAppSettingsChange}
          />
          Enable Notifications
        </label>
      </div>
      <div className="settings-form-group">
        <label>
          <input
            type="checkbox"
            name="sellerRegistration"
            checked={appSettings.sellerRegistration}
            onChange={handleAppSettingsChange}
          />
          Allow Seller Registration
        </label>
      </div>
      <div className="settings-form-group">
        <label>
          <input
            type="checkbox"
            name="feedbackVisibility"
            checked={appSettings.feedbackVisibility}
            onChange={handleAppSettingsChange}
          />
          Show Feedback to Users
        </label>
      </div>
    </section>

    {/* Actions */}
    <div className="settings-actions">
      <button className="reset-button" onClick={resetSettings}>
        Reset to Default
      </button>
      <button className="save-button" onClick={saveSettings}>
        Save Changes
      </button>
      
      <div className='admin-button'>
    <button className="Admin-logout-button" onClick={handleAdminLogout}>
        Logout
      </button>
    </div>

    </div>
    
  </div>

  )
}

export default Settings
