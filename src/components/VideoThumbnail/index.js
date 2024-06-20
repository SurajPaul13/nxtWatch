import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {ThemeContext} from '../../ThemeContext'
import {VideoTitle, VideoDescription} from './styledComponents'
import './index.css'

const VideoThumbnail = props => {
  const {
    id,
    name,
    profileImageUrl,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = props

  const {lightMode} = useContext(ThemeContext)

  return (
    <Link to={`/videos/${id}`} className="thumbnail-container">
      <img src={thumbnailUrl} alt="video thumbnail" width="100%" />
      <div className="thumbnail-details-container">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <div className="video-details-container">
          <VideoTitle lightMode={lightMode}>{title}</VideoTitle>
          <VideoDescription lightMode={lightMode}>
            {name} - {viewCount} - {publishedAt}
          </VideoDescription>
        </div>
      </div>
    </Link>
  )
}

export default VideoThumbnail
