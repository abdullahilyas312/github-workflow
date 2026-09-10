'use client'

import { useCart } from "@/context/CartContext"
import { clsx } from "clsx"

const AddToCartButton = ({
  onAddToCart,
  bgColor = "bg-[#ffffff]",
  textcolor = "text-[var(--color-primary)]"
}) => {
  const { addToCart } = useCart()

  const handleClick = () => {
    if (onAddToCart) {
      const product = onAddToCart()
      if (product && product.title && product.price) {
        addToCart(product)
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "cursor-pointer font-semibold py-3 px-14 shadow-lg transition-colors hover:bg-[#B88E2F] hover:text-white",
        bgColor,
        textcolor
      )}
    >
      Add to Cart
    </button>
  )
}

export default AddToCartButton