import {useContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {FaGamepad} from 'react-icons/fa'
import {ThemeContext} from '../../ThemeContext'
import MenuItem from '../../components/MenuContainer/styledComponent'
import {apiStatusConstants} from '../../components/constants'
import LoaderComponent from '../../components/LoaderComponent'
import FailureView from '../../components/FailureView'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/Sidebar'
import GamingVideoThumbnail from '../../components/GamingVideoThumbnail'
import './index.css'

const Gaming = () => {
  const [gamingVideos, setVideos] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const {lightMode} = useContext(ThemeContext)

  const fetchVideos = async () => {
    setApiStatus(apiStatusConstants.loading)

    const token = Cookies.get('jwt-token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const {videos} = await response.json()

      const convertedData = videos.map(data => ({
        id: data.id,
        thumbnailUrl: data.thumbnail_url,
        title: data.title,
        viewCount: data.view_count,
      }))
      setVideos(convertedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => fetchVideos(), [])

  const RenderGamingVideos = () =>
    gamingVideos.map(eachVideo => (
      <GamingVideoThumbnail key={eachVideo.id} data={eachVideo} />
    ))

  const renderGamingPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <LoaderComponent />
      case apiStatusConstants.success:
        return <RenderGamingVideos />
      case apiStatusConstants.failure:
        return <FailureView />
      default:
        return null
    }
  }

  return (
    <div
      className="main-container"
      style={{backgroundColor: lightMode ? '#f9f9f9' : '#0f0f0f'}}
    >
      <NavBar />
      <div className="body-container">
        <SideBar />
        <div style={{width: '100%'}}>
          <div className="page-heading">
            <FaGamepad className={`menu-icon ${lightMode ? '' : 'dark'}`} />
            <MenuItem lightMode={lightMode}>Gaming</MenuItem>
          </div>
          <div className="gaming-videos-container">{renderGamingPage()}</div>
        </div>
      </div>
    </div>
  )
}

export default Gaming
