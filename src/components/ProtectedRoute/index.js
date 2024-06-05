import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt-token')

  if (token) {
    return <Route {...props} />
  }

  return <Redirect to="/login" />
}

export default ProtectedRoute
