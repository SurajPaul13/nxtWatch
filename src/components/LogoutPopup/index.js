import {useContext} from 'react'
import Cookies from 'js-cookie'
import {withRouter, useHistory} from 'react-router-dom'
import {ThemeContext} from '../../ThemeContext'
import {WarningHeading} from '../FailureView/styledComponents'
import {LogoutOption} from './styledComponents'
import './index.css'

const LogoutPopup = () => {
  const {lightMode, toggleLogoutPopup, toggleLoginStatus} = useContext(
    ThemeContext,
  )
  const history = useHistory()

  const closeLogoutPopup = () => {
    toggleLogoutPopup()
  }

  const handleConfirmLogout = () => {
    toggleLoginStatus()
    toggleLogoutPopup()
    Cookies.remove('jwt-token')
    history.replace('/')
  }

  return (
    <div className="logout-card-bg">
      <div
        className="logout-card"
        style={{backgroundColor: lightMode ? '' : '#181818'}}
      >
        <WarningHeading lightMode={lightMode}>
          Are you sure you want to logout ?
        </WarningHeading>
        <div className="logout-btn-options">
          <LogoutOption
            lightMode={lightMode}
            className="option-btn"
            type="button"
            onClick={closeLogoutPopup}
          >
            Cancel
          </LogoutOption>
          <LogoutOption
            confirm
            lightMode={lightMode}
            className="option-btn"
            type="button"
            onClick={handleConfirmLogout}
          >
            Confirm
          </LogoutOption>
        </div>
      </div>
    </div>
  )
}

export default withRouter(LogoutPopup)
