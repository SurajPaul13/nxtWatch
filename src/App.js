import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import {ThemeContext} from './ThemeContext'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import './App.css'

const App = () => {
  const [lightMode, setTheme] = useState(false)

  const toggleTheme = () => {
    setTheme(prevMode => !prevMode)
  }

  return (
    <ThemeContext.Provider value={{lightMode, toggleTheme}}>
      <Switch>
        <Route exact path="/login" component={Login} />
        {/* <ProtectedRoute exact path="/login" component={Login} /> */}
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    </ThemeContext.Provider>
  )
}

export default App
