import {useContext} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {IoIosHome} from 'react-icons/io'
import {FaFire, FaGamepad} from 'react-icons/fa'
import {CgPlayListAdd} from 'react-icons/cg'
import {ThemeContext} from '../../ThemeContext'
import {MenuItem, MenuButton} from './styledComponent'
import './index.css'

const MenuContainer = () => {
  const {lightMode} = useContext(ThemeContext)
  const location = useLocation()
  const activeRoute = location.pathname

  return (
    <div className="menu-container">
      <Link to="/" className="link-item">
        <MenuButton lightMode={lightMode} isActive={activeRoute === '/'}>
          <IoIosHome className={`menu-icon ${lightMode ? '' : 'dark'}`} />
          <MenuItem lightMode={lightMode}>Home</MenuItem>
        </MenuButton>
      </Link>
      <Link to="/trending" className="link-item">
        <MenuButton
          type="button"
          lightMode={lightMode}
          isActive={activeRoute === '/trending'}
        >
          <FaFire />
          <MenuItem lightMode={lightMode}>Trending</MenuItem>
        </MenuButton>
      </Link>
      <Link to="/gaming" className="link-item">
        <MenuButton
          type="button"
          lightMode={lightMode}
          isActive={activeRoute === '/gaming'}
        >
          <FaGamepad />
          <MenuItem lightMode={lightMode}>Gaming</MenuItem>
        </MenuButton>
      </Link>
      <Link to="/saved-videos" className="link-item">
        <MenuButton
          lightMode={lightMode}
          isActive={activeRoute === '/saved-videos'}
        >
          <CgPlayListAdd />
          <MenuItem lightMode={lightMode}>Saved videos</MenuItem>
        </MenuButton>
      </Link>
    </div>
  )
}

export default MenuContainer
