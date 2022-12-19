import React from 'react'
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
  currentUser: null, 
  setCurrentUser: () => null,
  isMobile: ' ',
  setIsMobile: () => ' '
})
 
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  useEffect(() => {
    handleResize();
  }, [])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if(currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const value = { currentUser, setCurrentUser, isMobile, setIsMobile, handleResize }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}