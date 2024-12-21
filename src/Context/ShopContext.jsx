import { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [wishlistItems, setWishlistItems] = useState([]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += cartItems[item] * itemInfo.new_price;
      }
    }
    return totalAmount;
  };

  const contextValue = {
    all_product,
    getTotalCartItems: () => Object.values(cartItems).reduce((acc, curr) => acc + curr, 0),
    getTotalCartAmount, // Ensure this is included
    cartItems,
    addToCart: (itemId) => setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 })),
    removeFromCart: (itemId) => setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 })),
    wishlistItems,
    addToWishlist: (itemId) => setWishlistItems(prev => [...prev, itemId]),
    removeFromWishlist: (itemId) => setWishlistItems(prev => prev.filter(id => id !== itemId)),
    getTotalWishlistItems: () => wishlistItems.length,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
