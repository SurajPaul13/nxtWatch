import {useContext} from 'react'
import {ThemeContext} from '../../ThemeContext'
import {
  WarningHeading,
  WarningDescription,
} from '../../components/FailureView/styledComponents'

const NoSavedVideos = () => {
  const {lightMode} = useContext(ThemeContext)

  return (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        height="300px"
        className="failure-img"
      />
      <WarningHeading lightMode={lightMode}>
        No search results found
      </WarningHeading>
      <WarningDescription lightMode={lightMode}>
        You can save your videos while watching them
      </WarningDescription>
    </div>
  )
}
export default NoSavedVideos
