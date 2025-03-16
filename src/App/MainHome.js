import React, { useState, useEffect, useRef} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, InputGroup, FormControl, Button, Dropdown } from 'react-bootstrap';
import { FaSearch, FaTimes, FaUserCircle } from 'react-icons/fa';
import '../App/Mainhome.css';
import CardComponent from './CardComponent';
import { useAppContext } from "./AppContext";



const cardsData = [
  { title: 'AI', description: "Explore datasets designed for artificial intelligence, machine learning models, image recognition, NLP." },
  { title: 'Business', description: "Access business-related datasets for market analysis, customer insights, and financial performance tracking." },
  { title: 'Geographical', description: "Discover datasets covering maps, geospatial analytics and location-based insights for various regions."},
  { title: 'Healthcare', description: "Dive into datasets related to patient care, medical research, and healthcare system optimization." },
  { title: 'Scientific', description: "Browse datasets for academic research and scientific discoveries across multiple disciplines." },
  { title: 'Social & Cultural', description: "Gain insights into social trends, cultural behaviors, and demographic statistics." },
  { title: 'Educational', description: "Explore datasets for academic purposes, educational resources, and institutional performance." },
  { title: 'Industrial', description: "Analyze datasets for manufacturing, logistics, and industrial performance improvements." },
  { title: 'IoT', description: "Utilize datasets from IoT devices, including sensor data, smart home systems, and connected devices." },
  { title: 'Financial', description: "Access financial datasets for market trends, stock performance, and economic analysis." },
];

const MainHome = ({ setLoggedIn }) => {


  const [searchQuery, setSearchQuery] = useState('');
 
  const [filteredCards, setFilteredCards] = useState([]);
  const [showmenu, setshowmenu] = useState(false);
  const menuRef = useRef(null); // Create a reference for the dropdown menu
  const { isSellerApproved, userDetails, userProfile, setUserProfile } = useAppContext();
  const { username, profilePicture } = userProfile;
  const { email } = userDetails; 

  const location = useLocation(); // Get the current route
  const navigate = useNavigate();

  
  const toggleMenu = () => {
    setshowmenu(!showmenu)
  };
  
  const closeMenu = () => {
    setshowmenu(false)
  };


  useEffect(() => {
    // Load profile data from localStorage when the component mounts
    const username = localStorage.getItem('username');
    if (username) {
      const savedProfile = JSON.parse(localStorage.getItem(`currentUser_${username}`));
      if (savedProfile) {
        setUserProfile(savedProfile.profile);
      } else {
        // Set default profile if none exists
        setUserProfile({
          username: username,
          profilePicture: null,  // Default profile picture if not available
        });
      }
    }
  }, [setUserProfile]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    // Add event listener for clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      // triggerSearch(event.target.value);
    };
  
  
      // Filter cards based on the search query
      const triggerSearch = (query) => {
        // if (!query) {
        //   setFilteredCards([]); // Reset if query is empty
        //   return;
        // }
        const filtered = cardsData.filter((card) =>
          card.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCards(query ? filtered : []);
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
  

    const handleLogout = () => {
      
      localStorage.removeItem('isLoggedIn'); // Remove login status from localStorage
      const username = localStorage.getItem('username');
      if (username) {
        localStorage.removeItem(`currentUser_${username}`); // Remove user-specific profile data
      }
      setLoggedIn(false); // Update the logged-in state
      navigate('/'); // Redirect to the login page
    };
    

    const isHomePage = location.pathname === '/main-home';
    
 
  

  

  return (
    <div>



     {/* Navbar with options for the logged-in user */}
     {isHomePage && (
     <header className="navbar">
        <Container fluid className="d-flex align-items-center justify-content-between">
          <h1 className="brand-logo">Data.</h1>
          <ul className="nav-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/buy">Buy</Link></li>



                          {/* Dropdown for Sell */}
            {isSellerApproved ? (
              <>
                <Dropdown>
                <Dropdown.Toggle variant="link" className="dropdown-toggle">
                  Sell
                </Dropdown.Toggle>
                <Dropdown.Menu>
  
                  <Dropdown.Item as={Link} to="/sell/new">New Sell</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/sell/items">Items</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/sell/wallet">Wallet</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </>
            ) : (
              <li><Link to="/sellerApprovalSubmit">Sell</Link></li>
            )}
            
            <li><Link to="/allchat">Chat</Link></li> {/* Chat link for logged-in users */}
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <div className="auth-buttonsA">
            <div className='profile-container2'>
            {userProfile.profilePicture ? (
            <img
              src={profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profile-picture2"
              onClick={toggleMenu}
            />
          ) : (
                <FaUserCircle className="profile-icon" 
                 size={60}
                 onClick={toggleMenu}
                 style={{cursor:'pointer'}} />
          )} 
               {showmenu && (<div 
               className='profile-dropdown' ref={menuRef}>
                <p className='profile-name'>{username}</p>
                <p className='profile-email'>{email}</p>
                <ul className='profile-options'>
                  <li><button onClick={() => { closeMenu(); navigate('/customize-profile'); }}>customise profile</button></li>
                  <li><button onClick={() => { closeMenu(); navigate('/manage-account'); }}>manage account</button></li>
                  <li><button onClick={closeMenu}>close</button></li>
                  <li><button onClick={handleLogout}>Logout</button></li>

                </ul>
               </div>)}
            </div>

               {/* Font Awesome User Circle Icon */}
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
            <CardComponent cardsData={filteredCards.length > 0 ? filteredCards : cardsData}/>
        </main>1

    </div>
  )
}

export default MainHome
