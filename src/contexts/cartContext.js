import React, { useState } from 'react';

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + item.price);
  };

  const removeFromCart = (item) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((cartItem) => cartItem.id !== item.id)
    );
    setTotalPrice((prevTotalPrice) => prevTotalPrice - item.price);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, totalPrice, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
