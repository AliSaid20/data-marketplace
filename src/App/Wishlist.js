import React from 'react'
import { useAppContext } from './AppContext'
import { useNavigate } from 'react-router-dom';
import '../App/Purchaseandwishlist.css';


const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useAppContext();
    const navigate = useNavigate();

    const handleCardClick = (id) => {
      navigate(`/item-details/${id}`);
    };
  
    const handleRemoveItem = (itemId) => {
      const confirmRemove = window.confirm("Are you sure you want to remove this item from your wishlist?");
      if (confirmRemove) {
        removeFromWishlist(itemId);
      }
    };
  
  return (
    <div>
 
 <div className="navbarbuy">
        <div className="navbarbuy-links">
          <a href="/buy">Buy</a>
          <a href="/purchased">Purchased</a>
          <a href="/wishlist">Wishlist</a>
        </div>
      </div>

      <div className="wishlist-container">
        {wishlist.length === 0 ? (
          <div className="no-wishlist-items">
            <p>Your wishlist is empty.</p>
            <a href="/buy" className="buy-now-link">Browse items and add them to your wishlist!</a>
          </div>
        ) : (
          wishlist.map((item) => (
            <div
              key={item.id}
              className="wishlist-card"
              onClick={() => handleCardClick(item.id)}
            >
              {/* <img src={`/images/item-${item.id}.jpg`} alt={item.title} /> */}
              <div className="wishlist-card-body">
                {/* <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>{item.price}</p> */}

                <h3 className="wishlist-card-title">{item.title}</h3>
                <p className="wishlist-card-description">{item.description}</p>
                <p className="wishlist-card-price">{item.price}</p>

                <div className="purchased-card-rating">
                {[1,2,3,4,5].map((value) => (
                    <span
                    key={value}
                    className={`star ${value <= item.rating ? 'filled' : ''}`}
                  >
                    &#9733;
                  </span>
                ))}

                </div>
                <p className="buy-card-provider">{item.provider}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the card click from being triggered
                    handleRemoveItem(item.id);
                  }}
                  className="wishlist-remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Wishlist
