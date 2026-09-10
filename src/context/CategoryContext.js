'use client'
import { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  
  const updateSelectedCategory = (categoryData) => {
    setSelectedCategory(categoryData);
  };

  const updateCategories = (categoriesData) => {
    setCategories(categoriesData);
  };

  const clearSelectedCategory = () => {
    setSelectedCategory(null);
  };

  return (
    <CategoryContext.Provider value={{ 
      selectedCategory, 
      updateSelectedCategory,
      clearSelectedCategory,
      categories,
      updateCategories
    }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}
