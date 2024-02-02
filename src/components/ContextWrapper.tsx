"use client";
import { OrderedItems, ShoppingItem } from "@/constants";
import React, { createContext, useContext, useState } from "react";

interface ShoppingContextType {
  cartItems: ShoppingItem[];
  updateCartItems: (items: ShoppingItem[]) => void;
  orderedItems: OrderedItems[];
  updateOrderedItems: (items: OrderedItems[]) => void;
}

const ShoppingDetails = createContext<ShoppingContextType>({
  cartItems: [],
  updateCartItems: () => {},
  orderedItems: [],
  updateOrderedItems: () => {},
});

export const useShoppingDetails = () => {
  const context = useContext(ShoppingDetails);
  if (!context) {
    throw new Error(
      "useShoppingDetails must be used within a ShoppingDetails.Provider"
    );
  }
  return context;
};

const ContextWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [cartItems, updateCartItems] = useState<ShoppingItem[]>([]);
  const [orderedItems, updateOrderedItems] = useState<OrderedItems[]>([]);

  const shoppingContextValue: ShoppingContextType = {
    cartItems,
    updateCartItems,
    orderedItems,
    updateOrderedItems,
  };
  return (
    <ShoppingDetails.Provider value={shoppingContextValue}>
      {children}
    </ShoppingDetails.Provider>
  );
};

export default ContextWrapper;
