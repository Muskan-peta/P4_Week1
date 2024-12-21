import React, { useContext } from "react";
import "./Wishlist.css";
import { ShopContext } from "../../Context/ShopContext"; // Import ShopContext

const Wishlist = () => {
  const { wishlistItems, all_product, removeFromWishlist } = useContext(ShopContext);

  // Ensure that wishlistItems and all_product are valid and not undefined
  if (!wishlistItems || !all_product) {
    return <p>Loading...</p>;
  }

  // Find the product details for each item in the wishlist using the id
  const wishlistProducts = wishlistItems.map(itemId =>
    all_product.find(product => product.id === itemId)
  );

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">My Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      ) : (
        <ul className="wishlist-items">
          {wishlistProducts.map((item, index) => (
            item && (
              <li key={index} className="wishlist-item">
                <img src={item.image} alt={item.name} className="wishlist-image" />
                <div className="wishlist-details">
                  <h2 className="wishlist-item-name">{item.name}</h2>
                  {/* Display the correct price */}
                  <p className="wishlist-item-price">${item.new_price}</p> 
                  <button
                    className="wishlist-remove-btn"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
