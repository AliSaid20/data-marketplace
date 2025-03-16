import React from 'react'
import '../App/AllChat.css';
import { Link } from "react-router-dom";
import { useAppContext } from "./AppContext";

const AllChat = () => {
    const { chatThreads, userRole } = useAppContext();

    if (chatThreads.length === 0) {
        return <p>No chats available</p>;
      }
      
  return (
    <div className="all-chats-container">
      <h2>Your Chats</h2>
      <ul className="chat-thread-list">
        {chatThreads.map((thread, index) => (
          <li key={index} className="chat-thread">
            <Link to={`/chat/${thread.itemId}`}>
              <div className="chat-thread-info">
                <h3>{thread.itemTitle}</h3>
                 {/* Conditionally render based on the user role */}
                 {userRole === 'seller' ? (
                  <>
                    <p><strong>Buyer:</strong> {thread.buyerName}</p>
                    <p><strong>Status:</strong> {thread.status}</p>
                  </>
                ) : (
                  <>
                    <p><strong>Provider:</strong> {thread.provider}</p>
                    <p><strong>Last Message:</strong> {thread.lastMessage}</p>
                  </>
                )}
                </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllChat
