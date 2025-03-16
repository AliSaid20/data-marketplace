// ProtectedRoute.js
import { Navigate } from 'react-router-dom';



const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');  // Checking for token in localStorage

  if (!token) {
    // If no token found, redirect to login
    return <Navigate to="/signup-login" />;
  }

  // If token exists, render the protected content (children)  

};

export default ProtectedRoute;
