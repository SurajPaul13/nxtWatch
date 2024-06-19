import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import {ThemeContext} from './ThemeContext'
import Login from './routes/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './routes/Home'
import Trending from './routes/Trending'
import Gaming from './routes/Gaming'
import './App.css'

const App = () => {
  const [lightMode, setTheme] = useState(true)

  const toggleTheme = () => {
    setTheme(prevMode => !prevMode)
  }

  return (
    <ThemeContext.Provider value={{lightMode, toggleTheme}}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/trending" component={Trending} />
        <ProtectedRoute exact path="/game" component={Gaming} />
      </Switch>
    </ThemeContext.Provider>
  )
}

export default App
