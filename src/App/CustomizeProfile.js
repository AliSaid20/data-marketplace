// import React from 'react'

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../App/CustomizeProfile.css';
import { useAppContext } from './AppContext';



const CustomizeProfile = () => {
    const { userProfile, setUserProfile } = useAppContext();
    const [formData, setFormData] = useState({
        username: userProfile.username || '', // Replace with user data from your backend
        profilePicture: null,
      });
    
      const [preview, setPreview] = useState(null); // State for image preview

      const ProfilehandleSubmit = (e) => {
        e.preventDefault();

        const updatedProfile = {
          username: formData.username,
          profilePicture: formData.profilePicture || userProfile.profilePicture,
        };
      
        // Update the context
        setUserProfile(updatedProfile);
      

        const username = formData.username || 'default'; // Use a fallback username

          // Save updated profile to localStorage for the current user
          localStorage.setItem(`currentUser_${username}`, JSON.stringify({ profile: updatedProfile }));
        // Save to localStorage
        // localStorage.setItem('currentUser', JSON.stringify({ profile: updatedProfile }));
      
        alert('Account details updated successfully!');
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Image = reader.result;
            setFormData((prev) => ({ ...prev, profilePicture: base64Image }));
            setPreview(base64Image); // Show preview
          };
          reader.readAsDataURL(file);
        } else {
          setFormData((prev) => ({ ...prev, profilePicture: null }));
          setPreview(null);
        }
      };
    
    
    
  return (
    <div>
      <Container className="customize mt-4">
      <h2 className='custom-pro'>Customize Your Account</h2>
      <Form onSubmit={ProfilehandleSubmit}>

      <div className="profile-picture-container">
          <div className="profile-picture">
            <img
              src={preview || userProfile.profilePicture || 'https://via.placeholder.com/150'} // Default or uploaded image
              alt="Profile"
            />
          </div>
          <input
            type="file"
            id="profilePictureInput"
            onChange={handleFileChange}
            accept="image/*"
            hidden
          />
          <label htmlFor="profilePictureInput" className="upload-button">
            Upload Picture
          </label>
        </div>

        <Row className="mb-3 justify-content-center align-items-center">
          <Col md={6}>
            <Form.Group controlId="formUsername">
              <Form.Label className='custom-pro'>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
    </div>
  )
}

export default CustomizeProfile
