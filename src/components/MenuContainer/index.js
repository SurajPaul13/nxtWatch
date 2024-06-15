import {useContext} from 'react'
import {IoIosHome} from 'react-icons/io'
import {FaFire, FaGamepad} from 'react-icons/fa'
import {CgPlayListAdd} from 'react-icons/cg'
import {ThemeContext} from '../../ThemeContext'
import MenuItem from './styledComponent'
import './index.css'

const MenuContainer = () => {
  const {lightMode} = useContext(ThemeContext)

  return (
    <div className="menu-container">
      <div className="menu-item">
        <IoIosHome className={`menu-icon ${lightMode ? '' : 'dark'}`} />
        <MenuItem lightMode={lightMode}>Home</MenuItem>
      </div>
      <div className="menu-item">
        <FaFire className={`menu-icon ${lightMode ? '' : 'dark'}`} />
        <MenuItem lightMode={lightMode}>Trending</MenuItem>
      </div>
      <div className="menu-item">
        <FaGamepad className={`menu-icon ${lightMode ? '' : 'dark'}`} />
        <MenuItem lightMode={lightMode}>Game</MenuItem>
      </div>
      <div className="menu-item">
        <CgPlayListAdd className={`menu-icon ${lightMode ? '' : 'dark'}`} />
        <MenuItem lightMode={lightMode}>Saved videos</MenuItem>
      </div>
    </div>
  )
}

export default MenuContainer
