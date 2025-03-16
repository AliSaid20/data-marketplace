import React from 'react'
import '../App/AboutAndContact.css';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <div>
      <Container className="about-us my-5">
      <Row className="justify-content-center text-center">
        <Col xs={12} md={8}>
          <h1>About Us</h1>
          <p>
            Welcome to Data. , your trusted partner in data markets and insights.
            Our mission is to empower individuals and businesses with accurate
            and actionable data solutions. 
          </p>
        </Col>
      </Row>
      <Row className="my-4">
        <Col xs={12} md={6}>
          <h1>Our Vision</h1>
          <p>
            We aim to revolutionize the data economy by making it accessible, secure,
            and efficient for everyone.
          </p>
        </Col>
        <Col xs={12} md={6}>
          <h1>Our Team</h1>
          <p>
            Our team is a group of passionate professionals dedicated to innovation,
            collaboration, and excellence.
          </p>
        </Col>
      </Row>
      <Row className="text-center my-5">
        <Col>
          <h1>We'd love to hear from you!</h1>
          <p>
            If you have any questions, feel free to reach out to us via our
            <a href="/contact" className='link'> Contact page</a>.
          </p>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default AboutUs
