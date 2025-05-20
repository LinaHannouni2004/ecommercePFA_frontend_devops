// app/context/CartContext.js (ou context/CartContext.js)
//gere l'etat du panier 
'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const updateQuantity = (productId, newQuantity) => {
    setCart(cart.map(item => 
      item.id === productId 
        ? {...item, quantity: Math.max(1, newQuantity)} 
        : item
    ));
  };

  return (
    <CartContext.Provider value={{ 
      cartItems: cart,
      itemCount,
      addToCart, 
      removeFromCart, 
      isInCart,
      updateQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
