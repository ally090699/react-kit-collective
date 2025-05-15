import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(null);

  const confirmOrder = (orderDetails) => {
    // Get current order number from localStorage
    const currentOrderNum = parseInt(localStorage.getItem("lastOrderNumber")) || 0;
    const newOrderNum = currentOrderNum + 1;

    // Save new number back to localStorage
    localStorage.setItem("lastOrderNumber", newOrderNum.toString());

    // Attach order number to the order
    const orderWithNumber = {
      ...orderDetails,
      orderNumber: newOrderNum,
    };

    setOrder(orderWithNumber);
  };

  const clearOrder = () => {
    setOrder(null);
  };

  return (
    <OrderContext.Provider value={{ order, confirmOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
