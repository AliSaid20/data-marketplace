import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeA from './App/HomeA';
import React, { useState, useEffect } from 'react';

import MainHome from './App/MainHome';

import{ AppProvider} from './App/AppContext'; // Import AppProvider

import Buy from './App/Buy';
// import Sell from './App/Sell';
import AboutUs from './App/AboutUs';
import ContactUs from './App/ContactUs';
import SignupLogin from './App/SignupLogin';

import Purchased from './App/Purchased';
import Wishlist from './App/Wishlist';


import Newsell from './App/Newsell';
import Sellitems from './App/Sellitems';

import Itemdetails from './App/Itemdetails';
import ChatPage from './App/ChatPage';

import WalletPage from './App/WalletPage';

import AllChat from './App/AllChat';
import AdminPage from './App/AdminPage';

import SellerApproveSubmit from './App/SellerApproveSubmit';

import CustomizeProfile from './App/CustomizeProfile';
import ManageAccount from './App/ManageAccount';

import ProtectedRoute from './App/ProtectedRoute';

// import SignupLogin from './App/SignupLogin';
// import ResetPassword from './App/ResetPassword';

// const ProtectedRoute = ({ children }) => {
//   const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

//   if (!loggedIn) {
//     return <Navigate to="/signup-login" replace />;
//   }
//   return children;

  
  
// };


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log('loggedIn state:', isLoggedIn); // Debug log
    setLoggedIn(isLoggedIn);
  }, []);


  
  return (
    <AppProvider> {/* Wrap the entire app with AppProvider */}
    <Router>
    {/* <div className="App"> */}
    

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={loggedIn ? <Navigate to= "/main-home" replace/>:<HomeA />} />
        <Route
          path="/main-home"
          element={loggedIn ? <MainHome setLoggedIn={setLoggedIn}/> : <Navigate to="/signup-login" replace />}
        />
        <Route path="/buy" element={<Buy />} />

        <Route path="/item-details/:id" element={<Itemdetails />} /> {/* Item details route */}

        <Route path="/chat/:id" element={<ProtectedRoute loggedIn={loggedIn}>
              <ChatPage/>
            </ProtectedRoute>} />

        <Route 
          path="/sell" 
            element={<SignupLogin setLoggedIn={setLoggedIn} />} 
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/allchat" element={<AllChat />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup-login" element={<SignupLogin setLoggedIn={setLoggedIn}/>} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}

        <Route
          path="/admin"
          element={loggedIn ? <AdminPage setLoggedIn={setLoggedIn} /> : <SignupLogin setLoggedIn={setLoggedIn} />}
        />

        <Route path="/sellerApprovalSubmit" element={<SellerApproveSubmit />} />

        

        {/* <Route path="/purchased" element={<Purchased />} />  */}
        {/* <Route path="/wishlist" element={<Wishlist />} /> */}

        <Route path="/sell/new" element={<Newsell />} />
        <Route path="/sell/items" element={<Sellitems />} />
        <Route path="/sell/wallet" element={<WalletPage />} />
        
        <Route path="/customize-profile" element={<CustomizeProfile />} />
        <Route path="/manage-account" element={<ManageAccount />} />


            {/* Protected Routes */}
            <Route
          path="/purchased"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Purchased />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Wishlist />
            </ProtectedRoute>
          }
        />


      {/* <HomeA /> */}
      {/* <SignupLogin /> */}
      {/* <ResetPassword /> */}
      </Routes>
    {/* </div> */}
    </Router>
    </AppProvider>
  );
}

export default App;
