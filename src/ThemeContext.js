import React from 'react'

export const ThemeContext = React.createContext({
  isLoggedIn: false,
  toggleLoginStatus: () => {},
  lightMode: true,
  toggleTheme: () => {},
  savedVideos: [],
  toggleSaveVideo: () => {},
  showMenu: false,
  toggleMenu: () => {},
  showLogoutPopup: false,
  toggleLogoutPopup: () => {},
})

export default ThemeContext
