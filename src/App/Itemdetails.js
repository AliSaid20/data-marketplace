// import React from 'react'
import React, { useState } from "react";
import '../App/Itemdetails.css';
import { useParams } from "react-router-dom";
import { useAppContext } from "./AppContext";
import { Link } from "react-router-dom";


const Itemdetails = () => {

    const { id } = useParams(); // Get item ID from URL
    const { sellItems, addReview, deleteReview } = useAppContext(); // Get sellItems from context
  
    // Find the item by its ID
    const item = sellItems.find((item) => item.id === parseInt(id));
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5; // Number of reviews to display per page

  const currentUserId = "user123"; // Replace with actual user ID


  if (!item) {
    return <p>Item not found!</p>;
  }

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleRatingMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleRatingMouseLeave = () => {
    setHoverRating(0);
  };



  const userHasReviewed = item.reviews
  ? item.reviews.some((review) => review.userId === currentUserId)
  : false;


    // const handleChat = () => {
    //     alert("Chat with the provider is not implemented yet.");
    //   };



      const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (rating > 0 && reviewText.trim()) {
          try {
            await addReview(item.id, { rating, 
              text: reviewText, 
              date: new Date().toLocaleDateString(), 
              user: 'Anonymous',
              userId: currentUserId, // Add the current user ID here 
            });
          setRating(0);
          setReviewText('');
          // alert("Thank you for your review!");
        } catch (error) {
          console.error('Error submitting review:', error);
        }
        } else {
          alert('Please provide a rating and a review.');
        }
      };
    
      // Calculate average rating
      const averageRating = item.reviews && item.reviews.length > 0
        ? item.reviews.reduce((acc, review) => acc + review.rating, 0) / item.reviews.length
        : 0;


        // Get the total number of reviews
        const totalReviews = item.reviews ? item.reviews.length : 0;  // Define totalReviews
    
      // Pagination logic
      const indexOfLastReview = currentPage * reviewsPerPage;
      const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
      const currentReviews = item.reviews ? item.reviews.slice(indexOfFirstReview, indexOfLastReview) : [];
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
   
   
  return (
    <div className="item-details-container">
    {/* Preview Section */}
    <div className="item-preview">
      <h2>{item.title}</h2>
      <p>{item.description.substring(0, 100)}...</p>
      <p><strong>Price:</strong> ${item.priceValue}</p>
    </div>

    {/* Full Details */}
    <div className="item-details">
      <h3>Details</h3>
      <p>{item.description}</p>
      {/* Additional item details */}

      {/* Chat Button */}
      <div className="chat-button-container">
        <Link to={`/chat/${item.id}`} className="chat-button">
          Chat with Provider
        </Link>
      </div>
    </div>


          {/* Average Rating */}
          <div className="average-rating">
        <h3>Average Rating</h3>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={`star ${value <= averageRating ? 'filled' : ''}`}
            >
              &#9733;
            </span>
          ))}
        </div>
        <p>{averageRating.toFixed(1)} out of 5 ({totalReviews} ratings)</p>
      </div>


    {/* Rating and Review Section */}
    <div className="review-section">
      <h3>Rate and Review</h3>

      {userHasReviewed ? (
    <p>
      You have already reviewed this item. Please delete your current review if
      you wish to submit a new one.
    </p>
  ) : (
    <>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`star ${value <= (hoverRating || rating) ? 'filled' : ''}`}
            onClick={() => handleRatingClick(value)}
            onMouseEnter={() => handleRatingMouseEnter(value)}
            onMouseLeave={handleRatingMouseLeave}
            aria-label={`Rate ${value} out of 5`}
          >
            &#9733;
          </span>
        ))}
      </div>
      <form className="review-form" onSubmit={handleReviewSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
          required
        />
        <button type="submit">Submit Review</button>
      </form>
      </> )}
      </div>
      
          {/* Display Existing Reviews */}
      <div className="reviews-list">
        <h3>Customer Reviews</h3>
        {currentReviews.length > 0 ? (
          currentReviews.map((review, index) => (
            <div key={index} className="review">
              <div className="review-header">
                <span className="review-user">{review.user}</span>
                <span className="review-date">{review.date}</span>
              </div>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`star ${value <= review.rating ? 'filled' : ''}`}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <p>{review.text}</p>
              {review.userId === currentUserId && ( 
                <button
                  className="delete-review-button"
                  onClick={() => deleteReview(item.id, currentUserId)}
                >
                  Delete Review
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review this item!</p>
        )}


         {/* Pagination */}
         {item.reviews && item.reviews.length > reviewsPerPage && (
          <div className="pagination">
            {[...Array(Math.ceil(item.reviews.length / reviewsPerPage)).keys()].map((number) => (
              <button key={number + 1} onClick={() => paginate(number + 1)} className={currentPage === number + 1 ? 'active' : ''}>
                {number + 1}
              </button>
            ))}
          </div>
        )}

    </div>
  </div>

  )
}

export default Itemdetails
