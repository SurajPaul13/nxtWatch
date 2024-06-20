import React from 'react'

export const ThemeContext = React.createContext({
  lightMode: '',
  toggleTheme: () => {},
  savedVideos: [],
  toggleSaveVideo: () => {},
})

export default ThemeContext
