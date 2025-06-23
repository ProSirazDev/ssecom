import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // 🆕 New states for coupon and discount
  const [discountval, setDiscountVal] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

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

  const removeFromCart = (id, selectedSize, selectedColor) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        item =>
          !(
            item.id === id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );
    toast.warn("Removed from Cart");
  };

  const increaseQuantity = (id, selectedSize, selectedColor) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    toast.info('Added to Bag');
  };

  const decreaseQuantity = (id, selectedSize, selectedColor) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
    toast.info('Removed from Bag');
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountVal(0);         // clear discount on cart reset
    setAppliedCoupon(null);    // clear coupon on cart reset
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    discountval,
    setDiscountVal,
    appliedCoupon,
    setAppliedCoupon
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
