import {useContext} from 'react'
import {ThemeContext} from '../../ThemeContext'
import VideoThumbnail from '../VideoThumbnail'
import {WarningHeading, WarningDescription} from './styledComponents'
import './index.css'

const VideoSection = props => {
  const {videos} = props

  const {lightMode} = useContext(ThemeContext)

  const NoSearchResults = () => (
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
      <button className="retry-btn" type="button" onClick="">
        Retry
      </button>
    </div>
  )

  const Videos = () => {
    if (videos.length < 1) {
      return <NoSearchResults />
    }

    return (
      <div className="videos-container">
        {videos.map(eachVideo => (
          <VideoThumbnail
            key={eachVideo.id}
            id={eachVideo.id}
            name={eachVideo.name}
            profileImageUrl={eachVideo.profileImageUrl}
            publishedAt={eachVideo.publishedAt}
            thumbnailUrl={eachVideo.thumbnailUrl}
            title={eachVideo.title}
            viewCount={eachVideo.viewCount}
          />
        ))}
      </div>
    )
  }

  return <Videos />
}

export default VideoSection
