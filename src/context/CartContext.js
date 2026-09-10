'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      // const exists = prev.find((item) => item.slug === product.slug)
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          // item.slug === product.slug ? { ...item, qty: item.qty + 1 } : item
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }, [])

  // const removeFromCart = (slug) => {
  const removeFromCart = useCallback((id) => {
    // setCart((prev) => prev.filter((item) => item.slug !== slug))
    setCart((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    console.warn("CartContext not available")
    return {
      cart: [],
      addToCart: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
    }
  }
  return context
}