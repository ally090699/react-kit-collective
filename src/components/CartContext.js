// CartContext.js
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    console.log(stored ? JSON.parse(stored) : []);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const addQuantity = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const subQuantity = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const value = {
    cart,
    setCart,
    addToCart,
    addQuantity,
    subQuantity,
    deleteItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
