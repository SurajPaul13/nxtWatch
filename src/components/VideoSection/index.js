import VideoThumbnail from '../VideoThumbnail'
import './index.css'

const VideoSection = props => {
  const {videos} = props

  const Videos = () => (
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

  return <Videos />
}

export default VideoSection
