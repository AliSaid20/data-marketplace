// import React from 'react'
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../App/ManageAccount.css';
import { useAppContext } from "./AppContext";



const ManageAccount = () => {

  const { userDetails, setUserDetails } = useAppContext();
  const [formData, setFormData] = useState({
    email: userDetails.email, // Replace with user's current email
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const AccounthandleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const AccounthandleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      setSuccessMessage('');
      return;
    }

    setUserDetails((prev) => ({
      ...prev,
      email: formData.email,
    }));

    // Simulate a successful update
    setSuccessMessage('Account details updated successfully!');
    setErrorMessage('');

    // Here you can send the formData to your backend
    console.log('Updated account details:', formData);
  }


  return (
    <div>
      <Container className="Account mt-4">
      <h2 className='Account-manage'>Manage Your Account</h2>
      <Form onSubmit={AccounthandleSubmit}>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={AccounthandleInputChange}
                placeholder="Enter your new email"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formCurrentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={AccounthandleInputChange}
                placeholder="Enter your current password"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={AccounthandleInputChange}
                placeholder="Enter your new password"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={AccounthandleInputChange}
                placeholder="Confirm your new password"
              />
            </Form.Group>
          </Col>
        </Row>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
    </div>
  )
}

export default ManageAccount
