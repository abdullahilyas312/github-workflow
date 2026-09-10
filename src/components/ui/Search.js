'use client'

import { FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react'

export default function SearchInput({ placeholder = 'Search', onChange, value }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Return a placeholder during SSR to maintain layout
    return (
      <div className="flex items-center bg-[#F1F1F1] rounded-full px-4 py-2 max-w-sm">
        <FiSearch className="color-primary text-lg mr-2" />
        <div className="bg-transparent outline-none color-primary placeholder-[#B88E2FA8] w-full h-6"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center bg-[#F1F1F1] rounded-full px-4 py-2 max-w-sm">
      <FiSearch className="color-primary text-lg mr-2" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-transparent outline-none color-primary placeholder-[#B88E2FA8] w-full"
      />
    </div>
  )
}