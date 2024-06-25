import {useContext} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {ThemeContext} from '../../ThemeContext'
import MenuContainer from '../MenuContainer'
import './index.css'

const NavBar = () => {
  const {
    lightMode,
    showMenu,
    toggleTheme,
    toggleMenu,
    toggleLogoutPopup,
  } = useContext(ThemeContext)

  const token = Cookies.get('jwt-token')

  const changeTheme = () => {
    toggleTheme()
  }

  const handleMenu = () => {
    toggleMenu()
  }

  const handleLogout = () => {
    toggleLogoutPopup()
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
    <div style={{backgroundColor: lightMode ? 'transparent' : '#181818'}}>
      <div className="navbar">
        <Link to="/">
          <img height="20" src={appLogo} alt="logo" />
        </Link>
        <div className="nav-btn-container">
          <button type="button" className="nav-button" onClick={changeTheme}>
            <img
              className="nav-icon"
              width="20"
              height="20"
              src={themeIcon}
              alt="theme button"
            />
          </button>
          <button
            type="button"
            className="nav-button hide-hamburger-menu"
            onClick={handleMenu}
          >
            <img
              className="nav-icon"
              width="20"
              height="20"
              src={menuIcon}
              alt="menu button"
            />
          </button>
          {token ? (
            <>
              <button type="button" className="nav-button hide-profile-menu">
                <img
                  className="nav-icon"
                  width="20"
                  height="20"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </button>
              <button
                type="button"
                className="nav-button logout-btn"
                style={{marginRight: '0px'}}
                onClick={handleLogout}
              >
                <img
                  className="nav-icon logout-icon"
                  width="20"
                  height="20"
                  src={logoutIcon}
                  alt="logout button"
                />
                <p className="logout-label">Logout</p>
              </button>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <div
        className={`small-screen-menu-container ${
          showMenu ? 'display-menu' : ''
        }`}
      >
        <MenuContainer />
      </div>
    </div>
  )
}

export default NavBar
