// import React from 'react'
import React, { useState } from 'react';
import '../App/AboutAndContact.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


const ContactUs = () => {



  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill out all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormStatus('Please enter a valid email address.');
      return;
    }

    // Simulate form submission
    setFormStatus('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };




  return (
    <div>
       <Container className="contact-us my-5">
      <Row className="justify-content-center text-center">
        <Col xs={12} md={8}>
          <h1>Contact Us</h1>
          <p>
            Have questions or want to work with us? Fill out the form below, and
            we'll be in touch!
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className='contact-details'>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className='contact-details'>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label className='contact-details'>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button className='contact-custom-submit-button' type="submit">
              Submit
            </Button>
          </Form>
          {formStatus && <p className="form-status mt-3">{formStatus}</p>}
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default ContactUs
