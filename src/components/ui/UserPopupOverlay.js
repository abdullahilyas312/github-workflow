"use client"

import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation";
import { ROUTES_CONSTANTS } from "@/constants";
import { useUser } from "@/context/UserContext";
import { 
  IoPersonOutline, 
  IoBagOutline, 
  IoHeartOutline, 
  IoSettingsOutline, 
  IoLogOutOutline,
  IoLogInOutline,
  IoPersonAddOutline,
  IoPersonCircleOutline,
  IoChevronDownOutline 
} from "react-icons/io5";

export default function UserPopoverOverlay({ open, onClose }) {
  const ref = useRef();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useUser();

  const token = localStorage.getItem("awsAccessToken") || "";

  const handleClickOutside = useCallback((event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {

    // Close the overlay on route change
    onClose();
  }, [pathname, onClose]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    try {
      logout();
      onClose();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="absolute flex flex-col right-6 top-16 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 font-poppins"
        ref={ref}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        {/* User Info Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.username || "Anonymous User"} className="w-full h-full rounded-full object-cover" />
              ) : (
                <IoPersonOutline className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900">{user ? (user?.username || "Anonymous User") : "Guest User"}</p>
              <p className="text-xs text-gray-500">{user?.email || "guest@example.com"}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          { !token && <Link
              href={ROUTES_CONSTANTS.CREATE_ACCOUNT}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <IoPersonAddOutline className="w-4 h-4" />
              <span>Create Account</span>
              {/* <IoChevronDownOutline className="w-4 h-4 ml-auto rotate-[-90deg]" /> */}
            </Link>  
          }       

          
          { token && <Link
              href={ROUTES_CONSTANTS.ORDERS}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <IoPersonOutline className="w-4 h-4" />
              <span>Profile</span>
              {/* <IoChevronDownOutline className="w-4 h-4 ml-auto rotate-[-90deg]" /> */}
            </Link>
          }

          { !token && <Link
              href={ROUTES_CONSTANTS.LOGIN}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <IoLogInOutline className="w-4 h-4" />
              <span>Login</span>
              {/* <IoChevronDownOutline className="w-4 h-4 ml-auto rotate-[-90deg]" /> */}
            </Link>
          }
        </div>

        {/* Logout Button */}
        <div className="border-t border-gray-100 p-2">
          {token && <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <IoLogOutOutline className="w-4 h-4" />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </button>
          }
        </div>
      </motion.div>
    </AnimatePresence>
  );
}



