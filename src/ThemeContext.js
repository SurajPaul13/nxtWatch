import React from 'react'

export const ThemeContext = React.createContext({
  lightMode: '',
  toggleTheme: () => {},
})

export default ThemeContext
