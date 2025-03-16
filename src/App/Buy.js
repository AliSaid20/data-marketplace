// import React from 'react'
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../AppContext"; // Assuming you're using a Context for global state
import { useAppContext } from "./AppContext";
import '../App/Buy.css';


const items = [
  // {
  //   id: 1,
  //   title: "Item 1",
  //   provider: "Provider A",
  //   description: "High-quality dataset for analysis.",
  //   type: "Dataset",
  //   price: "$50",
  //   rating: 4,
  // },
  // {
  //   id: 2,
  //   title: "Item 2",
  //   provider: "Provider B",
  //   description: "Comprehensive user behavior insights.",
  //   type: "Dataset",
  //   price: "$70",
  //   rating: 5,
  // },
  // {
  //   id: 3,
  //   title: "Item 3",
  //   provider: "Provider C",
  //   description: "Demographic trends data.",
  //   type: "Analytics",
  //   price: "$30",
  //   rating: 3,
  // },
  // {
  //   id: 4,
  //   title: "Item 4",
  //   provider: "Provider D",
  //   description: "Customer feedback insights.",
  //   type: "Survey Data",
  //   price: "$90",
  //   rating: 5,
  // },
  // {
  //   id: 5,
  //   title: "Item 5",
  //   provider: "Provider E",
  //   description: "Retail sales performance data.",
  //   type: "Business Data",
  //   price: "$40",
  //   rating: 4,
  // },
  // {
  //   id: 6,
  //   title: "Item 6",
  //   provider: "Provider F",
  //   description: "Climate change impact reports.",
  //   type: "Reports",
  //   price: "$120",
  //   rating: 5,
  // },
  // {
  //   id: 7,
  //   title: "Item 7",
  //   provider: "Provider G",
  //   description: "Healthcare statistics.",
  //   type: "Medical Data",
  //   price: "$80",
  //   rating: 4,
  // },
  // {
  //   id: 8,
  //   title: "Item 8",
  //   provider: "Provider H",
  //   description: "Educational trends analysis.",
  //   type: "Educational Data",
  //   price: "$60",
  //   rating: 4,
  // },
  // {
  //   id: 9,
  //   title: "Item 9",
  //   provider: "Provider I",
  //   description: "Urban development insights.",
  //   type: "Urban Planning",
  //   price: "$70",
  //   rating: 5,
  // },
  // {
  //   id: 10,
  //   title: "Item 10",
  //   provider: "Provider J",
  //   description: "Agricultural yield reports.",
  //   type: "Farming Data",
  //   price: "$55",
  //   rating: 3,
  // },
];



const Buy = () => {


  const { wishlist, addToWishlist, removeFromWishlist, purchasedItems, addToPurchased, setSellItems, sellItems } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filtersoption, setFiltersoption] = useState({
    priceRange: null,
    category:"",
    fileType:"",
    sizeRange: null,
    userRating: null,
  });



  const toggleWishlist = (item) => {
    if (wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
      removeFromWishlist(item.id); // Remove item if it already exists in the wishlist
    } else {
      addToWishlist(item); // Add item to wishlist
    }
  };

  const handlePurchase = (item) => {
    if (!purchasedItems.some((purchased) => purchased.id === item.id)) {
      addToPurchased(item); // Add item to purchased list

      setSellItems((prevItems) =>
        prevItems.map((sellItem) =>
          sellItem.id === item.id
            ? { ...sellItem, soldCount: (sellItem.soldCount || 0) + 1 }
            : sellItem
        )
      );

      alert("Item purchased!");
    } else {
      alert("You already purchased this item!");
    }
  };

  const handleCardClick = (id) => {
    navigate(`/item-details/${id}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const allItems = useMemo(() => {
    // return [...items, ...sellItems];
      // Filter out items from sellItems that are not available for purchase
  const availableSellItems = sellItems.filter((item) => item.isAvailableForBuy !== false);
  return [...items, ...availableSellItems];
  }, [sellItems]);

  // const filteredItems = useMemo(() =>
  // allItems.filter((item) =>
  //   item.title.toLowerCase().includes(searchTerm.toLowerCase())
  // ), [allItems, searchTerm]);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearchTerm = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriceRange =
        !filtersoption.priceRange || (item.priceValue >= filtersoption.priceRange[0] && item.priceValue <= filtersoption.priceRange[1]);
        const matchesFreeOption = filtersoption.priceRange === "free" ? item.priceValue === 0 : true;
        const matchesCategory = !filtersoption.category || filtersoption.category === item.category;
        const matchesFileType = !filtersoption.fileType || filtersoption.fileType === item.fileType;
        const matchesSizeRange =
          !filtersoption.sizeRange || (item.size >= filtersoption.sizeRange[0] && item.size <= filtersoption.sizeRange[1]);
      const matchesUserRating = !filtersoption.userRating || item.rating >= filtersoption.userRating;

      return (
        matchesSearchTerm &&
        (matchesPriceRange || matchesFreeOption) &&
        matchesCategory &&
        matchesFileType &&
        matchesSizeRange &&
        matchesUserRating
      );
    });
  }, [allItems, searchTerm, filtersoption]);

  const toggleFilterModal = () => setShowFilterModal(!showFilterModal);

  const applyFilters = () => {
    setShowFilterModal(false);
    // Apply the filters to the items
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

      <div className="buy-search-filter-container">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearch}
          className="buy-search-bar"
        />
        <button className="buy-filter-button" onClick={toggleFilterModal} >Filter</button>
      </div>

      {showFilterModal && (
        <div className="filter-modal">
          <div className="filter-modal-content">
            <h3 className="h3">Filter Items</h3>
            <div className="filter-group">
              <h4 className="h4">Price Range</h4>
              <div className="priceRange">
              <label>
                  <input
                    type="radio"
                    name="price"
                    onChange={() => setFiltersoption({ ...filtersoption, priceRange: "free" })}
                  />
                  Free
                </label>
              <label>
                <input
                  type="radio"
                  name="price"
                  onChange={() => setFiltersoption({ ...filtersoption, priceRange: [0, 100] })}
                />
                $0 - $100
              </label>
              <label>
                <input
                  type="radio"
                  name="price"
                  onChange={() => setFiltersoption({ ...filtersoption, priceRange: [101, 400] })}
                />
                $101 - $400
              </label>
              <label>
                <input
                  type="radio"
                  name="price"
                  onChange={() => setFiltersoption({ ...filtersoption, priceRange: [401, 600] })}
                />
                $401 - $600
              </label>
              </div>
            </div>

           
            <div className="filter-group">
              <h4 className="h4">Category</h4>
              <select
                value={filtersoption.category}
                onChange={(e) => setFiltersoption({ ...filtersoption, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Medical">Medical</option>
                <option value="Analytics">Analytics</option>
              </select>
            </div>

            <div className="filter-group">
              <h4 className="h4">File Format</h4>
              <select
                value={filtersoption.fileType}
                onChange={(e) => setFiltersoption({ ...filtersoption, fileType: e.target.value })}
              >
                <option value="">Select File Format</option>
                <option value="CSV">CSV</option>
                <option value="JSON">JSON</option>
                <option value="XML">XML</option>
                <option value="PDF">PDF</option>
              </select>
            </div>

            <div className="filter-group">
              <h4 className="h4">Size Range (MB)</h4>
              <label>
                <input
                  type="radio"
                  name="size"
                  onChange={() => setFiltersoption({ ...filtersoption, sizeRange: [0, 50] })}
                />
                0 - 50MB
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  onChange={() => setFiltersoption({ ...filtersoption, sizeRange: [51, 200] })}
                />
                51 - 200MB
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  onChange={() => setFiltersoption({ ...filtersoption, sizeRange: [201, 500] })}
                />
                201 - 500MB
              </label>
            </div>
              

            <div className="filter-group">
              <h4 className="h4">Rating</h4>
              <label>
                <input
                  type="radio"
                  name="rating"
                  onChange={() => setFiltersoption({ ...filtersoption, userRating: 4 })}
                />
                4 Stars & Above
              </label>
              <label>
                <input
                  type="radio"
                  name="rating"
                  onChange={() => setFiltersoption({ ...filtersoption, userRating: 5 })}
                />
                5 Stars Only
              </label>
            </div>

            <div className="filter-actions">
              <button className="apply-button" onClick={applyFilters}>Apply</button>
              <button className="close-button" onClick={toggleFilterModal}>Close</button>
            </div>
          </div>
        </div>
      )}


      <div className="buy-card-container">
        {filteredItems.length === 0 ? (
          <p>No items found matching your search.</p>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="buy-card" onClick={() => handleCardClick(item.id)}> 
              <div
                className="buy-card-wishlist"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(item);
                }}
              >
                <span className={`wishlist-icon ${wishlist.some((wishlistItem) => wishlistItem.id === item.id) ? 'added' : ''}`}>
                {wishlist.some((wishlistItem) => wishlistItem.id === item.id) ? "\u2764" : "\u2661"}
                </span>
              </div>
              {/* <img src={`/images/item-${item.id}.jpg`} alt={item.title} /> */}
              <div className="buy-card-body">
                <h3 className="buy-card-title">{item.title}</h3>
                <p className="buy-card-description">{item.description}</p>
                <p className="buy-card-price">{item.price || `${item.currencySymbol}${item.priceValue}`}</p>
                <p className="buy-card-provider">{item.provider}</p>
                <div className="buy-card-rating">
                  {[1,2,3,4,5].map((value) => (
                    <span
                    key={value}
                    className={`star ${value <= item.rating ? 'filled' : ''}`}
                  >
                    &#9733;
                  </span>
                  ))}
                      <span className="review-count">
                          ({item.reviews ? item.reviews.length : 0} reviews)
                     </span>
                </div>
                <button
                  className="buy-card-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(item.id)
                    // handlePurchase(item);
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default Buy
