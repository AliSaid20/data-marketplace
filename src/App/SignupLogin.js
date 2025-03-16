// import React, { useState } from 'react';
import React, { useState,useEffect } from 'react';
// import { useAppContext } from './AppContext';
import { useNavigate } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import '../App/Signuplogin.css';

const SignupLogin = ({ setLoggedIn }) => {  

  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(''); // To display validation errors
  const navigate = useNavigate(); // React Router navigation hook

     // Check login status on component mount
     useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        setLoggedIn(true);  // Update loggedIn state
        navigate('/main-home');  // Redirect to main-home page
      }
    }, [setLoggedIn, navigate]);
    
  

  // Toggle between Login and Sign Up
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(''); // Clear any error messages when switching
  };

    // Validate form inputs
    const validateInputs = (email, password) => {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!email.match(emailRegex)) {
        return 'Please enter a valid email address.';
      }
      if (password.length < 6) {
        return 'Password should be at least 6 characters long.';
      }
      return '';
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = isSignUp ? event.target.name.value : '';

    const validationError = validateInputs(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }


    try{

      const response = await fetch(`http://localhost:8000/auth/${isSignUp ? 'signup' : 'login'}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, ...(isSignUp && { name }) }),
      });
    
      if (response.ok) {
        const userData = await response.json();

        localStorage.setItem('username', userData.username);  // Save the logged-in username
        localStorage.setItem('isLoggedIn', 'true');
        
        setLoggedIn(true);
        navigate('/main-home');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'An error occurred');
      }

    } catch (error) {
      setError(error.message);
    }
    
  };
  

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const email = event.target.email.value;
  //   const password = event.target.password.value;


  //       // Admin credentials
  //       const adminEmail = 'admin.login@gmail.com';
  //       const adminPassword = 'admin123';


  //   // Simple email and password validation
  //   if (!email.match(/\S+@\S+\.\S+/)) {
  //     setError('Please enter a valid email address.');
  //     return;
  //   }
  //   if (password.length < 6) {
  //     setError('Password should be at least 6 characters long.');
  //     return;
  //   }


  //   setError('');



  //       // Check if the user is an admin
  //       if (email === adminEmail && password === adminPassword) {
  //         localStorage.setItem('isLoggedIn', 'true');
  //         setLoggedIn(true);
  //         navigate('/admin');  // Redirect to admin page
  //         return;
  //       }


   
  //   // alert(isSignUp ? "Signing up..." : "Logging in...");

  //   localStorage.setItem('isLoggedIn', 'true');
  //   setLoggedIn(true); // Update loggedIn state on successful login/signup
  //   navigate('/main-home'); // Redirect to MainHome after successful login/signup


  //   // Simulate loading (replace with your API logic)
  //   // setTimeout(() => {
  //   //   event.target.reset();  // Reset form after submission
  //   // }, 1000);
  // };
  
  const handleGoogleLogin = () => {
    
    localStorage.setItem('isLoggedIn', 'true');


    // alert('Google Login logic here');
    setLoggedIn(true); // Simulate successful Google login
    navigate('/main-home'); // Redirect to MainHome

    // Replace with your actual Google OAuth 2.0 credentials
    // const clientId = 'YOUR_GOOGLE_CLIENT_ID';
    // const redirectUri = 'YOUR_REDIRECT_URI';
    
    // Google OAuth 2.0 URL
    // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=profile email`;

    // Redirecting to Google for login
    // window.location.href = authUrl;
  };

  return (
   
    <div className="auth-page">
    <div className={`auth-container ${isSignUp ? "sign-up-mode" : ""}`}>
      {/* Left Section */}
      <div className="info-panel">
        <h1>{isSignUp ? "Join Us" : "Welcome Back!"}</h1>
        <p>
          {isSignUp
            ? "Create an account to explore the world of data markets, insights, and more!"
            : "Login to access your account and continue your journey with Data."}
        </p>
        <button className="toggle-button" onClick={toggleForm}>
          {isSignUp ? "Login" : "Sign Up"}
        </button>
      </div>

      {/* Right Section */}
      <div className="form-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
            {!isSignUp && <ResetPassword />} {/* Forgot Password Component */}
          </div>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          <button  className="auth-button3">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>


        {/* Divider Section */}
        <div className="auth-divider">
          <span>OR</span>
        </div>



        <button className="google-login-button" onClick={handleGoogleLogin}>
          <img
            src="/google.png"  // Path from the public folder
            alt="Google Logo"
            className="google-icon"
          />

  <span>Sign up with Google</span>
</button>
      </div>
    </div>
  </div>
    
  )
}

export default SignupLogin
