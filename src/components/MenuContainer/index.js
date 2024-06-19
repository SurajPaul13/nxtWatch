import {useContext} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {IoIosHome} from 'react-icons/io'
import {FaFire, FaGamepad} from 'react-icons/fa'
import {CgPlayListAdd} from 'react-icons/cg'
import {ThemeContext} from '../../ThemeContext'
import MenuItem from './styledComponent'
import './index.css'

const MenuContainer = () => {
  const {lightMode} = useContext(ThemeContext)
  const location = useLocation()
  const activeRoute = location.pathname

  return (
    <div className="menu-container">
      <Link to="/" className="link-item">
        <button
          type="button"
          className={`menu-button ${activeRoute === '/' ? 'active-menu' : ''}`}
        >
          <IoIosHome className={`menu-icon ${lightMode ? '' : 'dark'}`} />
          <MenuItem lightMode={lightMode}>Home</MenuItem>
        </button>
      </Link>
      <Link to="/trending" className="link-item">
        <button
          type="button"
          className={`menu-button ${
            activeRoute === '/trending' ? 'active-menu' : ''
          }`}
        >
          <FaFire className={`menu-icon ${lightMode ? '' : 'dark'}`} />
          <MenuItem lightMode={lightMode}>Trending</MenuItem>
        </button>
      </Link>
      <Link to="/game" className="link-item">
        <button
          type="button"
          className={`menu-button ${
            activeRoute === '/game' ? 'active-menu' : ''
          }`}
        >
          <FaGamepad className={`menu-icon ${lightMode ? '' : 'dark'}`} />
          <MenuItem lightMode={lightMode}>Gaming</MenuItem>
        </button>
      </Link>
      <Link to="savedvideos" className="link-item">
        <button
          type="button"
          className={`menu-button ${
            activeRoute === '/savedvideos' ? 'active-menu' : ''
          }`}
        >
          <CgPlayListAdd className={`menu-icon ${lightMode ? '' : 'dark'}`} />
          <MenuItem lightMode={lightMode}>Saved videos</MenuItem>
        </button>
      </Link>
    </div>
  )
}

export default MenuContainer
