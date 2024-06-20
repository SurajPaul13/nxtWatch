import {useContext} from 'react'
import {ThemeContext} from '../../ThemeContext'
import {WarningHeading, WarningDescription} from './styledComponents'
import {iconConstants} from '../constants'
import './index.css'

const FailureView = props => {
  const {lightMode} = useContext(ThemeContext)
  const {failureViewIcon} = iconConstants
  const {fetchVideos} = props
  const handleRetry = () => fetchVideos(true)

  return (
    <div className="failure-view-container">
      <img
        src={`${lightMode ? failureViewIcon.light : failureViewIcon.dark}`}
        alt="failure view"
        height="300px"
        className="failure-img"
      />
      <WarningHeading lightMode={lightMode}>
        Oops! Something Went Wrong
      </WarningHeading>
      <WarningDescription lightMode={lightMode}>
        We are having some trouble to complete your request.
      </WarningDescription>
      <WarningDescription lightMode={lightMode}>
        Please try again
      </WarningDescription>
      <button className="retry-btn" type="button" onClick={handleRetry}>
        Retry
      </button>
    </div>
  )
}

export default FailureView
