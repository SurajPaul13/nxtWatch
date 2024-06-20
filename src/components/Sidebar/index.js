import {useContext} from 'react'
import {
  WarningHeading,
  WarningDescription,
} from '../NoSearchResults/styledComponents'
import MenuContainer from '../MenuContainer'
import {ThemeContext} from '../../ThemeContext'
import './index.css'

const SideBar = () => {
  const {lightMode} = useContext(ThemeContext)

  return (
    <div
      className="side-bar"
      style={{backgroundColor: lightMode ? 'transparent' : '#181818'}}
    >
      <MenuContainer />
      <div className="contact-us-section">
        <WarningHeading lightMode={lightMode} style={{fontSize: '10px'}}>
          CONTACT US
        </WarningHeading>
        <div className="contact-us-icons">
          <img
            height="20px"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
          <img
            height="20px"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
          <img
            height="20px"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </div>
        <WarningDescription lightMode={lightMode} style={{fontSize: '10px'}}>
          Enjoy! Now to see your channels and recommendations
        </WarningDescription>
      </div>
    </div>
  )
}

export default SideBar
