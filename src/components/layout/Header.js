'use client'

import { useCart } from '@/context/CartContext'
import { MdPersonOutline } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { HiOutlineMenu } from 'react-icons/hi';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { ROUTES_CONSTANTS } from '@/constants/routesConstants';
import SearchInput from '@/components/ui/Search';
import Button from '@/components/ui/Button';
import CartPopoverOverlay from '@/components/ui/CartPopupOverlay';
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from '@/DAL/categories';
import { useCategory } from '@/context/CategoryContext';
import UserPopoverOverlay from '@/components/ui/UserPopupOverlay';

export default function Navbar() {
  const { updateSelectedCategory, updateCategories } = useCategory();

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    // queryKey: [QUERY_CONSTANTS.ACCOUNT_HEAD],
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  // console.log("categories", categories);
  useEffect(() => {
    updateCategories(categories?.data || []);
  }, [categories]);

  const handleCategoryClick = (category) => {
    updateSelectedCategory({
      id: category.id,
      name: category.categoryName || category.title || category.label,
      description: category.description || '',
    });
  };

  const navItems = [
    { label: 'Home', href: ROUTES_CONSTANTS.HOME },
  
    ...(isLoading ? [
        { label: '', href: '#', isLoading: true, skeleton: true },
        { label: '', href: '#', isLoading: true, skeleton: true },
        { label: '', href: '#', isLoading: true, skeleton: true }
      ] : 
        categories?.data?.map(category => ({
          label: category.categoryName || category.title || category.label,
          href: `${ROUTES_CONSTANTS.CATEGORIES}/${category.id}`,
          isCategory: true,
          onClick: () => handleCategoryClick(category),
        })) || [])
     
  ];
  
  
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);
  const userRef = useRef(null);
  const [userOpen, setUserOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };
    if (cartOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [cartOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserOpen(false);
      }
    };
    if (userOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userOpen]);

  const { cart } = useCart()

  const drawer = (
    <div onClick={handleDrawerToggle} className="text-center py-4">
      <h2 className="text-xl font-bold mb-4">AWC</h2>
      <List>
        {navItems.map(({ label, href, isLoading, skeleton, onClick }, i) => (
          skeleton ? (
            <ListItem
              key={`skeleton-${i}`}
              className="hover:bg-gray-100 flex items-center"
            >
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
            </ListItem>
          ) : (
            <ListItem
              button
              key={i}
              component={Link}
              href={href}
              onClick={onClick}
              selected={pathname === href}
              className={`hover:bg-gray-100 ${pathname === href ? 'bg-gray-100 font-semibold' : ''}`}
            >
              <ListItemText primary={label} />
            </ListItem>
          )
        ))}
      </List>
    </div>
  );

  return (
    <div className="w-full font-poppins fixed z-50 shadow-md">
      <div className="hidden color-secondary sm:block  py-2 px-4 text-center">
        <p className="text-sm font-afacad color-Black">
          Welcome to Amir Watch Company – Discover Timeless Time Pieces in Every Watch
        </p>
      </div>
      <div className="bg-color-White">
        <Toolbar className=" flex items-center justify-between max-w-[90%] mx-auto px-4 py-2 w-full">
          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <HiOutlineMenu size={24} />
          </IconButton>

          {/* Logo */}
          <h1 className="hidden w-1/4 sm:block text-xl font-bold color-Black">AWC</h1>

          {/* Nav Links */}
          <div className="hidden sm:flex items-center justify-center space-x-6">
            {navItems.map(({ label, href, isLoading, skeleton, onClick }, index) => (
              skeleton ? (
                <div key={`skeleton-${index}`} className="px-3 py-2 rounded">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: '60px' }}></div>
                </div>
              ) : (
                <Link
                  key={href}
                  href={href}
                  onClick={onClick}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors duration-200 ${pathname === href ? 'color-primary' : 'color-Black'}`}
                >
                  {label}
                </Link>
              )
            ))}
          </div>

          <div className="hidden w-1/4 sm:flex items-center space-x-4">
            <SearchInput placeholder="Search" />
            <div className="relative" ref={userRef}>
            <Button icon={<MdPersonOutline className="color-primary w-6 h-6" onClick={() => setUserOpen(prev => !prev)}/>} />
            {userOpen && (
                  <UserPopoverOverlay open={userOpen} onClose={() => setUserOpen(true)} />
              )}
            </div>
            <div className="relative" ref={cartRef}>
              <Button
                icon={<MdOutlineShoppingBag className="color-primary w-6 h-6" />}
                onClick={() => setCartOpen(prev => !prev)}
                badge={cart?.length ?? 0}
              />

              {cartOpen && (
                  <CartPopoverOverlay open={cartOpen} onClose={() => setCartOpen(true)} />
              )}
            </div>
          </div>
        </Toolbar>
      </div>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: 240 } }}
      >
        {drawer}
      </Drawer>
    </div>
  );
}
