import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {


   // Authentication token
   const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

   // User data
   const [userData, setUserData] = useState(null);


   useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          const response = await fetch('https://your-backend-url/api/user', {
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data); // Set the fetched user data to the state

            // Save user data with a unique key (using their username or ID)
            localStorage.setItem(`userProfile_${data.username}`, JSON.stringify(data));
            localStorage.setItem('currentUser', data.username); // Track the logged-in user
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    if (authToken) fetchUserData();
    return () =>{};
  }, [authToken]); // Trigger the effect whenever the authToken changes



  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from localStorage or initialize as empty array
    const savedWishlist = localStorage.getItem("wishlist");
    try{
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    }catch(error){
      console.error("Failed to parse wishlist:", error);
    return [];
    }
    
    
    
  });

  const [purchasedItems, setPurchasedItems] = useState(() => {
    // Load purchasedItems from localStorage or initialize as empty array
    const savedPurchasedItems = localStorage.getItem("purchasedItems");
    // return savedPurchasedItems ? JSON.parse(savedPurchasedItems) : [];
    try {
      return savedPurchasedItems ? JSON.parse(savedPurchasedItems) : [];
    } catch (error) {
      console.error("Failed to parse purchasedItems:", error);
      return [];
    }
  });


  const [sellItems, setSellItems] = useState(() => {
    // Load sellItems from localStorage or initialize as empty array
    const savedSellItems = localStorage.getItem("sellItems");
    // return savedSellItems ? JSON.parse(savedSellItems) : [];


    try {
      return savedSellItems ? JSON.parse(savedSellItems) : [];
    } catch (error) {
      console.error("Failed to parse sellItems:", error);
      return [];
    }
  });


  const [chatMessages, setChatMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    try {
      return savedMessages ? JSON.parse(savedMessages) : {};
    } catch (error) {
      console.error("Failed to parse chatMessages:", error);
      return {};
    }
  });


  const [walletTransactions, setWalletTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem("walletTransactions");
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });


    // Initialize accountDetails from localStorage
    const [accountDetails, setAccountDetails] = useState(() => {
      const storedAccountDetails = localStorage.getItem("accountDetails");
      return storedAccountDetails
        ? JSON.parse(storedAccountDetails)
        : { accountNumber: "", bankName: "", ifscCode: "" };
    });

    const [userRole, setUserRole] = useState('buyer'); 
    
    const [chatThreads, setChatThreads] = useState(() => {
        const savedThreads = localStorage.getItem("chatThreads");
        try {
          return savedThreads ? JSON.parse(savedThreads) : [];
        } catch (error) {
          console.error("Failed to parse chatThreads:", error);
          return [];
        }
});

    const getChatThreads = () => chatThreads;

    const addChatThread = (thread) => {
      const { chatId } = thread;
      setChatThreads((prev) => [...prev, thread]);
      if (!chatMessages[chatId]) {
        setChatMessages((prevMessages) => ({ ...prevMessages, [chatId]: [] }));
      }
    };

    const setRole = (role) => setUserRole(role);


    const [isSellerApproved, setIsSellerApproved] = useState(false);

    useEffect(() => {
      const fetchApprovalStatus = async () => {
        // Mocking API call or fetching from localStorage
        const status = localStorage.getItem('isSellerApproved') === 'true';
        setIsSellerApproved(status);
      };
  
      fetchApprovalStatus();
    }, []);

    const [userDetails, setUserDetails] = useState(() => {
      const savedUserDetails = localStorage.getItem("userDetails");
      return savedUserDetails ? JSON.parse(savedUserDetails) : { email: '' }; // Default value if not found
    });
    
    const [userProfile, setUserProfile] = useState(() => {
      const savedUser = localStorage.getItem("currentUser"); // Store current user separately
      const userData = savedUser ? JSON.parse(savedUser) : {};
      return userData.profile || { username: '', profilePicture: null };
    });
    
    const [sellerSubmissions, setSellerSubmissions] = useState(() => {
  const storedSubmissions = localStorage.getItem("sellerSubmissions");
  try {
    return storedSubmissions ? JSON.parse(storedSubmissions) : []; // Parse or use an empty array as fallback
  } catch (error) {
    console.error("Error parsing sellerSubmissions from localStorage:", error);
    return []; // Fallback in case of malformed data
  }
});
    
const setUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user)); // Store current user data
  setUserProfile(user.profile); // Set new user profile
};


  useEffect(() => {
    // Update localStorage when wishlist or purchasedItems changes
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
    localStorage.setItem("sellItems", JSON.stringify(sellItems));
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
    localStorage.setItem("walletTransactions", JSON.stringify(walletTransactions));
    localStorage.setItem("accountDetails", JSON.stringify(accountDetails));
    localStorage.setItem("chatThreads", JSON.stringify(chatThreads));
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    localStorage.setItem("sellerSubmissions", JSON.stringify(sellerSubmissions));



  }, [wishlist, purchasedItems, sellItems, chatMessages, walletTransactions, accountDetails, chatThreads, userDetails, userProfile, sellerSubmissions]);



    // Logic for handling approval status, user role, etc.
    useEffect(() => {
      const fetchApprovalStatus = async () => {
        const status = localStorage.getItem('isSellerApproved') === 'true';
        setIsSellerApproved(status);
      };
  
      fetchApprovalStatus();
    }, []);



  const addToPurchased = (item) => {
    if (!purchasedItems.some((purchased) => purchased.id === item.id)) {
      setPurchasedItems((prev) => [...prev, item]);
    }
  };

  const addToWishlist = (item) => {
    if (!wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
      setWishlist((prev) => [...prev, item]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const addSellItem = (item) => {
    if (!sellItems.some((sellItem) => sellItem.id === item.id)) {
      setSellItems((prev) => [...prev, item]);
    }
  };


  const removeItem = (id) => {
    setSellItems((prev) => prev.filter((item) => item.id !== id));
  };
  


  const removeFromBuyPage = (id) => {
    setSellItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isAvailableForBuy: false } : item
      )
    );
  };
  
  const editItem = (id, updatedItem) => {
    setSellItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };
  
  const addToBuyPage = (id) => {
    setSellItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isAvailableForBuy: true } : item
      )
    );
  };


  const addChatMessage = (chatId, message) => {
    setChatMessages((prevMessages) => ({
      ...prevMessages,
      [chatId]: [...(prevMessages[chatId] || []), message],
    }));
  };

  const getChatMessages = (chatId) => chatMessages[chatId] || [];
  
  const clearChatMessages = (chatId) => {
    setChatMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
      delete updatedMessages[chatId];
      return updatedMessages;
    });
  };



    // Define the addReview function
    const addReview = (itemId, review, userId) => {
      setSellItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId
            ? { 

              ...item,
              reviews: item.reviews
                ? item.reviews.some((r) => r.userId === userId)
                  ? item.reviews.map((r) =>
                      r.userId === userId ? { ...r, ...review } : r
                    ) // Update existing review
                  : [...item.reviews, { userId, ...review }] // Add new review
                : [{ userId, ...review }], // Initialize reviews array



              // ...item, 
              // reviews: [...(item.reviews || []), review],
              rating: calculateAverageRating([...(item.reviews || []), review]), 
              }
            : item
        )
      );
    };

    const calculateAverageRating = (reviews) =>
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;


    const deleteReview = (itemId, userId) => {
      setSellItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId
            ? {
                ...item,
                reviews: item.reviews
                  ? item.reviews.filter((review) => review.userId !== userId)
                  : [],
              }
            : item
        )
      );
    };
    


const addTransaction = (transaction) => {
  setWalletTransactions((prevTransactions) => [...prevTransactions, transaction]);
};



    // Method to update account details
    const updateAccountDetails = (details) => {
      setAccountDetails(details);
    };
  
      // Add a new submission
  const addSubmission = (submission) => {
    setSellerSubmissions((prev) => [...prev, submission]);
  };

  // Update the status of a submission
  const updateSubmissionStatus = (id, newStatus) => {
    setSellerSubmissions((prev) =>
      prev.map((submission) =>
        submission.id === id ? { ...submission, status: newStatus } : submission
      )
    );
  };


  return (
    <AppContext.Provider
      value={{
        wishlist,
        setWishlist,
        purchasedItems,
        setPurchasedItems,
        sellItems,
        setSellItems,
        addToPurchased,
        addToWishlist,
        removeFromWishlist,
        addSellItem,
        removeFromBuyPage,
        removeItem,
        editItem,
        addToBuyPage,
        addReview,
        deleteReview,
        addTransaction,
        walletTransactions,
        accountDetails,
        updateAccountDetails,
        setChatMessages,
        addChatMessage,
        getChatMessages,
        clearChatMessages,
        chatThreads,
        getChatThreads,
        addChatThread,
        userRole,
        setRole,
        isSellerApproved,
        setIsSellerApproved,
        userDetails,
        setUserDetails,
        userProfile,
        setUserProfile,
        sellerSubmissions,
        addSubmission,
        updateSubmissionStatus,
        authToken,
        setAuthToken,
        userData,
        setUserData,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
