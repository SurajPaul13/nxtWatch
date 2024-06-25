import Cookies from 'js-cookie'
import {useState, useContext} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import {
  LoginContainer,
  FormElement,
  Label,
  LoginInput,
} from './styledComponents'
import {ThemeContext} from '../../ThemeContext'
import {iconConstants} from '../../components/constants'
import './index.css'

const Login = () => {
  const initialState = {
    username: '',
    password: '',
    errorMsg: '',
    showError: false,
  }

  const [state, setState] = useState(initialState)
  const {lightMode, toggleLoginStatus} = useContext(ThemeContext)
  const history = useHistory()

  const onLoginSuccess = token => {
    toggleLoginStatus()
    Cookies.set('jwt-token', token, {expires: 30})
    history.replace('/')
  }

  const onLoginFailure = errorMsg => {
    setState(prevState => ({...prevState, errorMsg, showError: true}))
  }

  const handleLogin = async event => {
    event.preventDefault()

    const {username, password} = state
    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onLoginSuccess(data.jwt_token)
    } else {
      onLoginFailure(data.error_msg)
    }
  }

  const handleUsername = event => {
    event.preventDefault()
    const username = event.target.value
    setState(prevState => ({...prevState, username, showError: false}))
  }

  const handlePassword = event => {
    event.preventDefault()
    const password = event.target.value
    setState(prevState => ({...prevState, password, showError: false}))
  }
  const {username, password, errorMsg, showError} = state
  const {logoIcon} = iconConstants

  const logoSrc = lightMode ? logoIcon.light : logoIcon.dark

  const token = Cookies.get('jwt-token')
  if (token !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <LoginContainer bgColor={lightMode ? '' : '#212121'}>
      <FormElement bgColor={lightMode ? '' : '#000'} onSubmit={handleLogin}>
        <img src={logoSrc} alt="logo" className="login-app-logo" />
        <div className="login-labels-container">
          <Label>USERNAME</Label>
          <LoginInput
            type="text"
            placeholder="Enter username"
            onChange={handleUsername}
            value={username}
          />
        </div>
        <div className="login-labels-container">
          <Label>PASSWORD</Label>
          <LoginInput
            type="password"
            placeholder="Enter password"
            onChange={handlePassword}
            value={password}
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        {showError ? (
          <p style={{display: 'block', color: 'red'}}>*{errorMsg}</p>
        ) : (
          ''
        )}
      </FormElement>
    </LoginContainer>
  )
}

export default Login
