import React from 'react'
import { useAppContext } from './AppContext'
import { useNavigate } from 'react-router-dom';
import '../App/Purchaseandwishlist.css';


const Purchased = () => {
    const { purchasedItems } = useAppContext();
    const navigate = useNavigate();

    const handleCardClick = (id) => {
      navigate(`/item-details/${id}`);
    };
  
      const handleViewDetails = (id) => {
    navigate(`/item-details/${id}`);
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

      <div className="purchased-container">
        {purchasedItems.length === 0 ? (
          <div className="no-purchased-items">
            <p>You haven't purchased any items yet.</p>
            <a href="/buy" className="buy-now-link">Browse items and make a purchase!</a>
          </div>
        ) : (
          purchasedItems.map((item) => (
            <div
              key={item.id}
              className="purchased-card"
              onClick={() => handleCardClick(item.id)}
            >
              {/* <img src={`/images/item-${item.id}.jpg`} alt={item.title} /> */}
              <div className="purchased-card-body">
                {/* <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>{item.price}</p> */}

                <h3 className="purchased-card-title">{item.title}</h3>
                <p className="purchased-card-description">{item.description}</p>
                <p className="purchased-card-price">{item.price}</p>
                <p className="buy-card-provider">{item.provider}</p>

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


                {/* View Details Button */}
                <button
                  className="view-details-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event
                    handleViewDetails(item.id);
                  }}
                >
                  View Details
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Purchased
