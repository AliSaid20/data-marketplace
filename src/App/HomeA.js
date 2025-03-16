import React, { useState } from 'react';
import '../App/MainApp.css';
import {Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaTimes } from 'react-icons/fa';


// import MainHome from './MainHome';
// import Buy from './Buy';
// import Sell from './Sell';
// import AboutUs from './AboutUs';
// import ContactUs from './ContactUs';
// import SignupLogin from './SignupLogin';

import CardComponent from './CardComponent';

const HomeA = () => {


  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation(); // Get the current route
  const [filteredCards, setFilteredCards] = useState([]);
  const navigate = useNavigate();




  const cardsData = [
    { title: 'AI', description: "Explore datasets designed for artificial intelligence, machine learning models, image recognition, NLP.", category:'AI' },
    { title: 'Business', description: "Access business-related datasets for market analysis, customer insights, and financial performance tracking.", category:'Business'  },
    { title: 'Geographical', description: "Discover datasets covering maps, geospatial analytics and location-based insights for various regions.", category:'Geographical'},
    { title: 'Healthcare', description: "Dive into datasets related to patient care, medical research, and healthcare system optimization.", category:'Healthcare' },
    { title: 'Scientific', description: "Browse datasets for academic research and scientific discoveries across multiple disciplines.", category:'Scientific' },
    { title: 'Social & Cultural', description: "Gain insights into social trends, cultural behaviors, and demographic statistics.", category:'Social & Cultural' },
    { title: 'Educational', description: "Explore datasets for academic purposes, educational resources, and institutional performance.", category:'Educational' },
    { title: 'Industrial', description: "Analyze datasets for manufacturing, logistics, and industrial performance improvements.", category:'Industrial' },
    { title: 'IoT', description: "Utilize datasets from IoT devices, including sensor data, smart home systems, and connected devices.", category:'IoT' },
    { title: 'Financial', description: "Access financial datasets for market trends, stock performance, and economic analysis.", category:'Financial' },
  ];




  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // triggerSearch(event.target.value);
  };


    // Filter cards based on the search query
    const triggerSearch = (query) => {
      if (!query) {
        setFilteredCards([]); // Reset if query is empty
        return;
      }
      const filtered = cardsData.filter((card) =>
        card.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCards(filtered);
    };
  


  // Handle Enter key press or Search button click
  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      triggerSearch(searchQuery);
    }
  };

  const handleSearchButtonClick = () => {
    triggerSearch(searchQuery);
  };


  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredCards([]);
  };

  
  // // Trigger the search logic
  // const triggerSearch = () => {
  //   alert(`Searching for "${searchQuery}"`);
  // };

  const handleCardClick = (category) => {
    navigate(`/buy?category=${category}`);
  };

  const isHomePage = location.pathname === '/home';

  return (
  <div>
      {/* Conditionally Render Navbar (only on the home page) */}
      {isHomePage && (
        <header className="navbar1">
          <Container fluid className="d-flex align-items-center justify-content-between">
            <h1 className="brand-logo">Data.</h1>
              <ul className="nav-links1">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/buy">Buy</Link></li>
                <li><Link to="/sell">Sell</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
              <div className="auth-buttonsA">
                <Link to="/signup-login">
                  <button className="auth-buttonA login-buttonA">Login / Sign Up</button>
                </Link>
              </div>
          </Container>
        </header>
       )}

        {isHomePage && (
        <Container className="my-4">
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Ai, Business, Geographical, Healthcare, Scientific, Educational etc...."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyPress} // Trigger search on Enter key press
                  className="search-bar"
                />



                {searchQuery ? (
                  <Button
                  type="button"
                  onClick={handleClearSearch}
                  className="clear-button"
                  >
                  <FaTimes />
                  </Button>
                ) : (
                  <Button
                  type="button"
                  onClick={handleSearchButtonClick}
                  className="search-button"
        >
                  <FaSearch />
                  </Button>
                )}
              </InputGroup>
            </Col>
          </Row>
        </Container>
        )}

        <main className="main-content">
            <CardComponent 
              cardsData={filteredCards.length > 0 ? filteredCards : cardsData}
              onCardClick={handleCardClick}/>
        </main>


        
  </div>
    
  )
}

export default HomeA
