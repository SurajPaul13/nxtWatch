import {useContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import {ThemeContext} from '../../ThemeContext'
import MenuItem from '../MenuContainer/styledComponent'
import TrendingCard from './TrendingCard'
import {apiStatusConstants} from '../constants'
import './index.css'
import LoaderComponent from '../LoaderComponent'
import FailureView from '../FailureView'

const Trending = () => {
  const [trendingVideos, setTrendingVideos] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const {lightMode} = useContext(ThemeContext)

  const fetchTrendingVideos = async () => {
    setApiStatus(apiStatusConstants.loading)

    const token = Cookies.get('jwt-token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const {videos} = await response.json()

      const convertedData = videos.map(data => {
        const {channel} = data
        return {
          id: data.id,
          name: channel.name,
          profileImageUrl: channel.profile_image_url,
          publishedAt: data.published_at,
          thumbnailUrl: data.thumbnail_url,
          title: data.title,
          viewCount: data.view_count,
        }
      })
      setTrendingVideos(convertedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => fetchTrendingVideos(), [])

  const RenderTrendingVideos = () => (
    <div className="trending-videos-container">
      {trendingVideos.map(eachVideo => (
        <TrendingCard data={eachVideo} />
      ))}
    </div>
  )

  const renderPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <LoaderComponent />
      case apiStatusConstants.success:
        return <RenderTrendingVideos />
      case apiStatusConstants.failure:
        return <FailureView />

      default:
        return null
    }
  }

  return (
    <div className="trending-section">
      <div className="trending-heading">
        <FaFire className={`menu-icon ${lightMode ? '' : 'dark'}`} />
        <MenuItem lightMode={lightMode}>Trending</MenuItem>
      </div>
      {renderPage()}
    </div>
  )
}

export default Trending
