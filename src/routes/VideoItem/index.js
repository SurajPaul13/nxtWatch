import {useState, useEffect, useContext} from 'react'
import {parse, formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {RiPlayListAddFill} from 'react-icons/ri'
import {BsDot} from 'react-icons/bs'
import {EmotionButton} from './styledComponents'
import {apiStatusConstants} from '../../components/constants'
import {
  VideoTitle,
  VideoDescription,
} from '../../components/VideoThumbnail/styledComponents'
import {ThemeContext} from '../../ThemeContext'
import LoaderComponent from '../../components/LoaderComponent'
import FailureView from '../../components/FailureView'
import './index.css'

const VideoItem = props => {
  const [videoDetails, setVideoDetails] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const {match} = props
  const {params} = match
  const {id: videoId} = params

  const {lightMode, toggleSaveVideo, showMenu, toggleMenu} = useContext(
    ThemeContext,
  )

  const fetchVideoItem = async isMounted => {
    if (showMenu) {
      toggleMenu()
    }

    setApiStatus(apiStatusConstants.loading)
    const url = `https://apis.ccbp.in/videos/${videoId}`
    const token = Cookies.get('jwt-token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok && isMounted) {
      const data = await response.json()
      const {video_details: videoItemDetails} = data
      const {channel} = videoItemDetails

      const date = parse(
        videoItemDetails.published_at,
        'MMM d, yyyy',
        new Date(),
      )
      const dateWords = formatDistanceToNow(date).split(' ')

      const dateDifference = dateWords.slice(1).join(' ')

      const convertedData = {
        id: videoItemDetails.id,
        title: videoItemDetails.title,
        videoUrl: videoItemDetails.video_url,
        thumbnailUrl: videoItemDetails.thumbnail_url,
        name: channel.name,
        profileImageUrl: channel.profile_image_url,
        subscriberCount: channel.subscriber_count,
        viewCount: videoItemDetails.view_count,
        publishedAt: videoItemDetails.published_at,
        description: videoItemDetails.description,
        dateDifference,
        isLiked: false,
        isDisliked: false,
        isSaved: false,
      }
      setVideoDetails(convertedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    let isMounted = true

    fetchVideoItem(isMounted)

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLike = () => {
    setVideoDetails(prevState => ({
      ...prevState,
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  const handleDislike = () => {
    setVideoDetails(prevState => ({
      ...prevState,
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  const handleSave = () => {
    setVideoDetails(prevState => ({
      ...prevState,
      isSaved: !prevState.isSaved,
    }))
    toggleSaveVideo(videoDetails)
  }

  const {
    title,
    description,
    videoUrl,
    name,
    profileImageUrl,
    subscriberCount,
    viewCount,
    dateDifference,
    isLiked,
    isDisliked,
    isSaved,
  } = videoDetails

  const VideoItemComponent = () => (
    <div className="video-item-container">
      <ReactPlayer className="video-item" url={videoUrl} />
      <div className="video-details">
        <VideoTitle
          lightMode={lightMode}
          style={{fontSize: '14px', fontWeight: '400'}}
        >
          {title}
        </VideoTitle>
        <div className="views-timeline-container">
          <VideoDescription lightMode={lightMode}>
            {viewCount} views
          </VideoDescription>
          <BsDot />
          <VideoDescription lightMode={lightMode}>
            {dateDifference} ago
          </VideoDescription>
        </div>
        <div className="emotion-btns-container">
          <EmotionButton
            isActive={isLiked}
            lightMode={lightMode}
            type="button"
            className="video-reaction-btn"
            onClick={handleLike}
          >
            <BiLike style={{marginRight: '6px'}} />
            <p>Like</p>
          </EmotionButton>
          <EmotionButton
            isActive={isDisliked}
            lightMode={lightMode}
            type="button"
            className="video-reaction-btn"
            onClick={handleDislike}
          >
            <BiDislike style={{marginRight: '6px'}} />
            <p>Dislike</p>
          </EmotionButton>
          <EmotionButton
            isActive={isSaved}
            lightMode={lightMode}
            type="button"
            className="video-reaction-btn"
            onClick={handleSave}
          >
            <RiPlayListAddFill style={{marginRight: '6px'}} />
            <p>Save</p>
          </EmotionButton>
        </div>
        <hr />
        <div className="profile-details-container">
          <img src={profileImageUrl} alt={name} className="profile-img" />
          <div className="video-details-container" style={{fontSize: '10px'}}>
            <VideoTitle lightMode={lightMode}>{name}</VideoTitle>
            <VideoDescription lightMode={lightMode}>
              {subscriberCount} subscribers
            </VideoDescription>
          </div>
        </div>
        <VideoDescription lightMode={lightMode}>{description}</VideoDescription>
      </div>
    </div>
  )

  const renderPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <LoaderComponent />
      case apiStatusConstants.success:
        return <VideoItemComponent />
      case apiStatusConstants.failure:
        return <FailureView fetchVideos={fetchVideoItem} />

      default:
        return null
    }
  }

  return renderPage()
}

export default VideoItem
