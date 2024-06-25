import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import {ThemeContext} from './ThemeContext'
import Login from './routes/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './routes/Home'
import Trending from './routes/Trending'
import Gaming from './routes/Gaming'
import VideoItem from './routes/VideoItem'
import SavedVideos from './routes/SavedVideos'
import NavBar from './components/NavBar'
import SideBar from './components/Sidebar'
import LogoutPopup from './components/LogoutPopup'
import './App.css'

const App = () => {
  const [lightMode, setTheme] = useState(true)
  const [showMenu, setMenu] = useState(false)
  const [savedVideos, setSavedVideos] = useState([])
  const [showLogoutPopup, setLogoutPopup] = useState(false)
  const [isLoggedIn, setLoginStatus] = useState(false)

  const toggleLoginStatus = () => {
    setLoginStatus(prevState => !prevState)
  }

  const toggleLogoutPopup = () => {
    setLogoutPopup(prevState => !prevState)
  }

  const toggleTheme = () => {
    setTheme(prevMode => !prevMode)
  }

  const toggleSaveVideo = videoItem => {
    setSavedVideos(prevState => {
      const isPresent = prevState.find(obj => obj.id === videoItem.id)
      if (isPresent) {
        return prevState.filter(obj => obj.id !== videoItem.id)
      }

      return [...prevState, videoItem]
    })
  }

  const toggleMenu = () => {
    setMenu(prevState => !prevState)
  }

  return (
    <ThemeContext.Provider
      value={{
        lightMode,
        toggleTheme,
        savedVideos,
        toggleSaveVideo,
        showMenu,
        toggleMenu,
        showLogoutPopup,
        toggleLogoutPopup,
        isLoggedIn,
        toggleLoginStatus,
      }}
    >
      <div
        className="main-app"
        style={{backgroundColor: lightMode ? '#f9f9f9' : '#0f0f0f'}}
      >
        <NavBar />
        {showLogoutPopup ? <LogoutPopup /> : ''}
        <div className="body-container">
          <SideBar />
          <div className="routes-container">
            <Switch>
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/trending" component={Trending} />
              <ProtectedRoute exact path="/gaming" component={Gaming} />
              <ProtectedRoute exact path="/videos/:id" component={VideoItem} />
              <ProtectedRoute
                exact
                path="/saved-videos"
                component={SavedVideos}
              />
            </Switch>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
