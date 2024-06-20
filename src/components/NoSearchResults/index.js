import {useContext} from 'react'
import {ThemeContext} from '../../ThemeContext'
import {WarningHeading, WarningDescription} from './styledComponents'

const NoSearchResults = props => {
  const {retrySearch} = props
  const {lightMode} = useContext(ThemeContext)

  const onClickRetry = () => {
    retrySearch()
  }

  return (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
        alt="no videos"
        height="300px"
        className="failure-img"
      />
      <WarningHeading lightMode={lightMode}>
        No search results found
      </WarningHeading>
      <WarningDescription lightMode={lightMode}>
        Try different keyword or remove search filter
      </WarningDescription>
      <button className="retry-btn" type="button" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )
}
export default NoSearchResults
