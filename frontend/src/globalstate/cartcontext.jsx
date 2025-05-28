import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


// const addToCart = (product) => {
//   setCartItems((prevItems) => {
//     const existing = prevItems.find(item => item.id === product.id);
//     if (existing) {
//       return prevItems.map(item =>
//         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//     } else {
//       return [...prevItems, { ...product, quantity: 1 }];
//     }
//   });

//   // Show toast after state update is triggered, NOT inside updater function
//   toast.info("Added to Bag");
// };
const addToCart = (product) => {
  setCartItems((prevItems) => {
    const existing = prevItems.find(
      item =>
        item.id === product.id &&
        item.selectedSize === product.selectedSize &&
        item.selectedColor === product.selectedColor
    );

    if (existing) {
      return prevItems.map(item =>
        item.id === product.id &&
        item.selectedSize === product.selectedSize &&
        item.selectedColor === product.selectedColor
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prevItems, { ...product, quantity: 1 }];
    }
  });

  toast.info("Added to Bag");
};



  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    toast.warn("Removed from Cart")
  };

const increaseQuantity = (id) => {
  setCartItems((prevItems) =>
    prevItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
  toast.info('Added to Bag'); // Or whatever message you want here
};

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
    toast.info('Remove from Bag')
  };
  const clearCart = () => {
  setCartItems([]);
};



  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
