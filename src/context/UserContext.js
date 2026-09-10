"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES_CONSTANTS } from '@/constants/routesConstants';

import { useQueryClient, useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/DAL/user';
import { BUSINESS_ID } from '@/config/config';


const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: userProfile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
    // refetch: refetchUserProfile,
  } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId, BUSINESS_ID),
    enabled: !!userId && !!localStorage.getItem("awsAccessToken"),
    // retry: 1,
    // staleTime: 5 * 60 * 1000,
  });


  useEffect(() => {
    const checkUserSession = () => {
      try {
        const userData = localStorage.getItem('awsUser');
        const token = localStorage.getItem('awsAccessToken');

        if (userData && token) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setUserId(parsedUser?.id);
          setToken(token);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);


  useEffect(() => {
    if (userProfile?.data) {
      setUser(userProfile.data);
      localStorage.setItem('awsUser', JSON.stringify(userProfile.data));
    }
  }, [userProfile]);

  const login = async (awcUser, token) => {
    try {
      // Store token first
      localStorage.setItem('awsAccessToken', token);

      // Set states after token is stored
      setToken(token);

      // Add a small delay to ensure localStorage write completes
      setTimeout(() => {
        setUserId(awcUser?.id);

        // Invalidate any existing user profile queries to force fresh fetch
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      }, 10);

      // localStorage.setItem('awsUser', JSON.stringify(awcUser));
      // setUser(awcUser);
      setIsLoading(false);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    try {
      setIsLoading(true);
      // Clear all user data
      router.push(ROUTES_CONSTANTS.HOME);
      localStorage.removeItem('awsUser');
      localStorage.removeItem('awsAccessToken');
      sessionStorage.clear();

      setUser(null);
      setUserId(null);
      setToken(null);

      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }

  };

  const updateUser = (updatedUserData) => {
    try {
      const newUserData = { ...user, ...updatedUserData };
      localStorage.setItem('awsUser', JSON.stringify(newUserData));
      setUser(newUserData);
      return { success: true };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: error.message };
    }
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('awsAccessToken');
  };

  const value = {
    user,
    isLoading: isProfileLoading || isLoading,
    isProfileLoading,
    isProfileError,
    profileError,
    setIsLoading,
    login,
    logout,
    updateUser,
    isAuthenticated,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
