"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import { ROUTES_CONSTANTS } from '@/constants/routesConstants'

export function AuthGuard({ children }) {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [showLoading, setShowLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Check if user is authenticated by looking at localStorage directly
    // This ensures we don't have timing issues with state updates
    const checkAuth = () => {
      const token = localStorage.getItem('awsAccessToken')
      const userData = localStorage.getItem('awsUser')

      if (token && userData) {
        setShowLoading(false)
      } else {
        router.push(ROUTES_CONSTANTS.LOGIN)
      }
    }

    if (!isLoading) {
      checkAuth()
      // Remove the setTimeout as it's unnecessary and causes delays
    }
  }, [isLoading, router, isClient])

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <section className="font-poppins w-full flex flex-col gap-10 items-center justify-center mx-auto pt-40 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </section>
    )
  }

  if (isLoading || showLoading) {
    return (
      <section className="font-poppins w-full flex flex-col gap-10 items-center justify-center mx-auto pt-40 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </section>
    )
  }

  // Check localStorage directly for authentication
  const token = localStorage.getItem('awsAccessToken')
  const userData = localStorage.getItem('awsUser')

  if (!token || !userData) {
    return null
  }

  // Render children if user is authenticated
  return children
}
