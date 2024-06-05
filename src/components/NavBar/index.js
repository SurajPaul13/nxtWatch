import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoIosHome} from 'react-icons/io'
import {FaFire, FaGamepad} from 'react-icons/fa'
import {CgPlayListAdd} from 'react-icons/cg'
import {ThemeContext} from '../../ThemeContext'
import MenuItem from './styledComponent'
import './index.css'

class NavBar extends Component {
  state = {lightMode: true, showMenu: false}

  toggleTheme = () => {
    this.setState(prevState => ({lightMode: !prevState.lightMode}))
  }

  handleMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  render() {
    const {lightMode, showMenu} = this.state

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
      <ThemeContext.Provider value={{lightMode, toggleTheme: this.toggleTheme}}>
        <div
          className="navbar"
          style={{backgroundColor: lightMode ? '' : '#0f0f0f'}}
        >
          <Link to="/">
            <img height="30" src={appLogo} alt="logo" />
          </Link>
          <div>
            <button
              type="button"
              className="nav-button"
              onClick={this.toggleTheme}
            >
              <img width="30" height="30" src={themeIcon} alt="theme button" />
            </button>
            <button
              type="button"
              className="nav-button"
              onClick={this.handleMenu}
            >
              <img width="30" height="30" src={menuIcon} alt="menu button" />
            </button>
            <button type="button" className="nav-button">
              <img
                width="30"
                height="30"
                src={logoutIcon}
                alt="logout button"
              />
            </button>
          </div>
        </div>
        <div
          className={`menu-container ${showMenu ? 'display-container' : ''}`}
          style={{backgroundColor: lightMode ? '' : '#0f0f0f'}}
        >
          <div className="menu-item">
            <IoIosHome className={`menu-icon ${!lightMode ? 'dark' : ''}`} />
            <MenuItem className={!lightMode ? 'dark' : ''}>Home</MenuItem>
          </div>
          <div className="menu-item">
            <FaFire className={`menu-icon ${!lightMode ? 'dark' : ''}`} />
            <MenuItem className={!lightMode ? 'dark' : ''}>Trending</MenuItem>
          </div>
          <div className="menu-item">
            <FaGamepad className={`menu-icon ${!lightMode ? 'dark' : ''}`} />
            <MenuItem className={!lightMode ? 'dark' : ''}>Game</MenuItem>
          </div>
          <div className="menu-item">
            <CgPlayListAdd
              className={`menu-icon ${!lightMode ? 'dark' : ''}`}
            />
            <MenuItem className={!lightMode ? 'dark' : ''}>
              Saved videos
            </MenuItem>
          </div>
        </div>
      </ThemeContext.Provider>
    )
  }
}

export default NavBar
