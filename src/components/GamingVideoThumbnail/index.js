import {useContext} from 'react'
import {ThemeContext} from '../../ThemeContext'
import {VideoTitle, VideoDescription} from '../VideoThumbnail/styledComponents'
import './index.css'

const GamingVideoThumbnail = props => {
  const {lightMode} = useContext(ThemeContext)

  const {data} = props
  const {id, thumbnailUrl, title, viewCount} = data

  return (
    <div className="gaming-video-card" id={id}>
      <img src={thumbnailUrl} className="game-img" alt={title} />
      <VideoTitle lightMode={lightMode}>{title}</VideoTitle>
      <VideoDescription lightMode={lightMode} style={{fontSize: '12px'}}>
        {viewCount} Watching
      </VideoDescription>
    </div>
  )
}

export default GamingVideoThumbnail
