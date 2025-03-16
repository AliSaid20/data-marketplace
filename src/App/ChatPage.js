// import React from 'react'
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "./AppContext";
import '../App/ChatPage.css';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas


const ChatPage = () => {

    const { id } = useParams();
    const { sellItems, getChatMessages, addChatMessage, clearChatMessages, addTransaction, addChatThread } = useAppContext();
    const item = sellItems.find((item) => item.id === parseInt(id));

     const messages = getChatMessages(id);

    // const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [walletAddress] = useState("seller-wallet-address"); // Replace with actual seller wallet address

    

    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const [isMenuOpen, setIsMenuOpen] = useState(false);  // State to manage menu visibility

    const chatWindowRef = useRef(null);

        // Load messages from localStorage when the component mounts
   
        useEffect(() => {
            if (chatWindowRef.current) {
              chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
            }
          }, [messages]);
        
          const handleSendMessage = () => {
            if (newMessage.trim()) {
              addChatMessage(id, { text: newMessage, sender: "User" });

                    // Update the chat thread with the last message
                    const updatedThread = {
                        itemId: id,
                        itemTitle: item.title,
                        provider: item.provider,
                        lastMessage: newMessage,
                    };
                    addChatThread(updatedThread);

              setNewMessage("");
            }
          };

    useEffect(() => {
      // Scroll to the bottom of the chat window when messages change
      if (chatWindowRef.current) {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
      }
    }, [messages]);


    if (!item) {
        return <p>Item not found!</p>;
    }

    // const handleSendMessage = () => {
    //     if (newMessage.trim()) {
    //         setMessages([...messages, { text: newMessage, sender: "User" }]);
    //         setNewMessage("");
    //     }
    // };

    const handleOpenPaymentModal = () => {
        setIsPaymentModalOpen(true);
    };

    const handleClosePaymentModal = () => {
        setIsPaymentModalOpen(false);
    };

    // const handlePayment = () => {
    //     alert(`Proceeding to payment of $${paymentAmount}...`);

    //     handlePaymentComplete(paymentAmount);
    //     // Implement payment logic here
    //     setIsPaymentModalOpen(false); // Close modal after payment
    // };

    const handlePaymentOptionSelect = (option) => {
        setSelectedPaymentMethod(option);
        
    };



    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);  // Toggle the menu visibility
    };

    const handleClearChat = () => {
        clearChatMessages(id);  // Clear the messages for the current chat
        setIsMenuOpen(false);  // Close the menu after clearing chat
    };



    const handlePayment = () => {


        if (selectedPaymentMethod === "card") {
            // Validate card details
            if (
              !cardDetails.cardNumber ||
              !cardDetails.expiryDate ||
              !cardDetails.cvv
            ) {
              alert("Please fill in all credit card details before proceeding.");
              return; // Stop payment processing if card details are incomplete
            }
          }


        if (paymentAmount > 0) {
            // Simulate payment processing (you can replace this with actual API calls)
            alert(`Payment of $${paymentAmount} successful!`);

            // After successful payment, show a message in the chat
            const paymentMessage = {
                sender: "system",
                text: `Payment of $${paymentAmount} completed successfully.`,
                type: "payment", // Optional, if you need to style it differently
            };

            addChatMessage(id, paymentMessage); // Add payment success message to chat



                // Add the payment to wallet transactions (this is the part where the amount is added to the wallet)
                addTransaction({
                    type: "payment",
                    amount: parseFloat(paymentAmount),
                    date: new Date().toLocaleString(),
                    status: "Completed",
                });


            // Close the payment modal
            setIsPaymentModalOpen(false);
            setPaymentAmount("");
            setCardDetails({ cardNumber: "", expiryDate: "", cvv: "" });
        } else {
            alert("Please enter a valid payment amount.");
        }
    };

    


    const handleCardPaymentSubmit = (e) => {
        e.preventDefault();
        if (!paymentAmount || paymentAmount <= 0) {
            alert("Please enter a valid payment amount.");
            return;
        }
        // Here you can integrate real payment logic (e.g., call to payment API)
        alert(`Processing card payment for card ending in ${cardDetails.cardNumber.slice(-4)}`);
        setIsPaymentModalOpen(false); // Close the modal after payment
    };

    

  return (
    <div className="chat-page-wrapper">
    <div className="chat-page-container">
    <div className="chat-header">
        {/* <div className="profile-img">
            
            <img src="provider-image-url" alt="Provider" />
        </div> */}
        <h3>{item.provider}</h3>
          {/* 3 Dots Menu */}
          <div className="menu-icon" onClick={handleMenuToggle}>
                        <span>...</span> {/* Simple 3-dot icon */}
                    </div>
                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="dropdown-clearMenu">
                            <button onClick={handleClearChat}>Clear Chat</button>
                            {/* Add more options here */}
                        </div>
                    )}
    </div>

    <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
                <p>{msg.text}</p>
                <div className="message-payment">
                {msg.type === "payment" ? msg.content : msg.content }
                </div> 
            </div>
        ))}
    </div>

    <div className="chat-input">
        <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
    </div>

    <div className="payment-button-container">
        <button onClick={handleOpenPaymentModal}>Make Payment</button>
    </div>

    {isPaymentModalOpen && (
        <div className="payment-modal">
            <div className="payment-modal-content">
            <h3>Select Payment Method</h3>
            <div className="payment-methods">
                <button onClick={() => handlePaymentOptionSelect("qr")}>
                    Pay with QR Code
                </button>
                <button onClick={() => handlePaymentOptionSelect("card")}>
                    Pay with Credit/Debit Card
                </button>
            </div>

            {selectedPaymentMethod === "qr" && (
                <div className="qr-code-container">
                    <h4>Scan this QR Code to Pay</h4>
                    <QRCodeCanvas value={walletAddress} size={256} />
                </div>
            )}

            {selectedPaymentMethod === "card" && (
                <div className="card-payment-container">
                    <div className="payment-amount">
                    <input
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="Amount to pay"
                        min="1"
                        required
                    />
                    </div>
                    <h4>Enter your card details</h4>
                    <form onSubmit={handleCardPaymentSubmit} action="#">
                                        <input
                                            type="text"
                                            value={cardDetails.cardNumber}
                                            onChange={(e) =>
                                                setCardDetails({
                                                    ...cardDetails,
                                                    cardNumber: e.target.value,
                                                })
                                            }
                                            placeholder="Card Number"
                                            required
                                        />
                                        <input
                                            type="text"
                                            value={cardDetails.expiryDate}
                                            onChange={(e) =>
                                                setCardDetails({
                                                    ...cardDetails,
                                                    expiryDate: e.target.value,
                                                })
                                            }
                                            placeholder="MM/YY"
                                            required
                                        />
                                        <input
                                            type="text"
                                            value={cardDetails.cvv}
                                            onChange={(e) =>
                                                setCardDetails({
                                                    ...cardDetails,
                                                    cvv: e.target.value,
                                                })
                                            }
                                            placeholder="CVV"
                                            required
                                        />
                                        <button type="submit" onClick={handlePayment}>Pay Now</button>
                                    </form>
                </div>
            )}

            <button onClick={handleClosePaymentModal}>Cancel</button>
            </div>
        </div>
    )}


    
    

</div>
</div>
  )
}

export default ChatPage
