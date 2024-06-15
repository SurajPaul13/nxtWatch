import {useState, useContext} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter, useHistory} from 'react-router-dom'
import {ThemeContext} from '../../ThemeContext'
import MenuContainer from '../MenuContainer'
import './index.css'

const NavBar = () => {
  const [showMenu, setMenu] = useState(false)

  const {lightMode, toggleTheme} = useContext(ThemeContext)

  const {history} = useHistory()

  const changeTheme = () => {
    toggleTheme()
  }

  const handleMenu = () => {
    setMenu(prevMenu => !prevMenu)
  }

  const handleLogout = () => {
    Cookies.remove('jwt-token')
    history.replace('/login')
  }

  const appLogo = lightMode
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

  const themeIcon = lightMode
    ? 'https://img.icons8.com/ios-glyphs/30/moon-symbol.png'
    : 'https://img.icons8.com/ios-filled/50/FFFFFF/sun--v1.png'

  const menuIcon = lightMode
    ? 'https://img.icons8.com/ios-filled/50/menu--v6.png'
    : 'https://img.icons8.com/ios-filled/50/FFFFFF/menu--v6.png'

  const logoutIcon = lightMode
    ? 'https://img.icons8.com/ios/50/exit--v1.png'
    : 'https://img.icons8.com/pixels/32/FFFFFF/exit.png'

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img height="30" src={appLogo} alt="logo" />
        </Link>
        <div className="nav-btn-container">
          <button type="button" className="nav-button" onClick={changeTheme}>
            <img width="30" height="30" src={themeIcon} alt="theme button" />
          </button>
          <button
            type="button"
            className="nav-button hide-hamburger-menu"
            onClick={handleMenu}
          >
            <img width="30" height="30" src={menuIcon} alt="menu button" />
          </button>
          <button type="button" className="nav-button hide-profile-menu">
            <img
              width="30"
              height="30"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
          </button>
          <button
            type="button"
            className="nav-button logout-btn"
            onClick={handleLogout}
          >
            <img
              width="30"
              height="30"
              src={logoutIcon}
              alt="logout button"
              className="logout-icon"
            />
            <p className="logout-label">Logout</p>
          </button>
        </div>
      </div>
      <div
        className={`small-screen-menu-container ${
          showMenu ? 'display-menu' : ''
        }`}
      >
        <MenuContainer />
      </div>
    </>
  )
}

export default withRouter(NavBar)
