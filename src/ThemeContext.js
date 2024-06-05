import React from 'react'

export const ThemeContext = React.createContext({
  lightMode: false,
  toggleTheme: () => {},
})

export default ThemeContext
