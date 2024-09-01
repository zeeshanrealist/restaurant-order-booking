'use client';

import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';

type Product = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
}

type CartContextType = {
  cartProducts: Product[];
  setCartProducts: Dispatch<SetStateAction<Product[]>>
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const cartProviderValue = useMemo(() => ({
    cartProducts,
    setCartProducts
  }), [cartProducts])
  return (
    <CartContext.Provider value={cartProviderValue}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCard must be used within an CartProvider');
  }
  return context;
};
