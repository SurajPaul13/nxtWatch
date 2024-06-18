import {useContext} from 'react'
import Loader from 'react-loader-spinner'
import {ThemeContext} from '../../ThemeContext'
import './index.css'

const LoaderComponent = () => {
  const {lightMode} = useContext(ThemeContext)

  return (
    <div className="loader-container">
      <Loader
        type="ThreeDots"
        color={`${lightMode ? '#000' : '#fff'}`}
        height="50"
        width="50"
      />
    </div>
  )
}

export default LoaderComponent
