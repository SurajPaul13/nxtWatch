import Cookies from 'js-cookie'
import {Component} from 'react'
import {
  LoginContainer,
  FormElement,
  Label,
  LoginInput,
} from './styledComponents'
import {ThemeContext} from '../../ThemeContext'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  onLoginSuccess = token => {
    const {history} = this.props

    Cookies.set('jwt-token', token, {expires: 30})

    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({errorMsg, showError: true})
  }

  handleLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
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
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  handleUsername = event => {
    event.preventDefault()
    const username = event.target.value
    this.setState({username, showError: false})
  }

  handlePassword = event => {
    event.preventDefault()
    const password = event.target.value
    this.setState({password, showError: false})
  }

  render() {
    const {username, password, errorMsg, showError} = this.state

    return (
      <ThemeContext.Consumer>
        {theme => {
          const {lightMode} = theme
          console.log('the theme is', lightMode)
          return (
            <LoginContainer bgColor={lightMode ? '' : '#212121'}>
              <FormElement
                bgColor={lightMode ? '' : '#000'}
                className="login-form"
                onSubmit={this.handleLogin}
              >
                <img
                  src={
                    lightMode
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  }
                  alt="logo"
                  className="login-app-logo"
                />
                <div className="login-labels-container">
                  <Label>USERNAME</Label>
                  <LoginInput
                    type="text"
                    placeholder="Enter username"
                    onChange={this.handleUsername}
                    value={username}
                  />
                </div>
                <div className="login-labels-container">
                  <Label>PASSWORD</Label>
                  <LoginInput
                    type="password"
                    placeholder="Enter password"
                    onChange={this.handlePassword}
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
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
