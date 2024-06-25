import {useContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {FaGamepad} from 'react-icons/fa'
import {ThemeContext} from '../../ThemeContext'
import {MenuItem} from '../../components/MenuContainer/styledComponent'
import {apiStatusConstants} from '../../components/constants'
import LoaderComponent from '../../components/LoaderComponent'
import FailureView from '../../components/FailureView'
import GamingVideoThumbnail from '../../components/GamingVideoThumbnail'
import './index.css'

const Gaming = () => {
  const [gamingVideos, setVideos] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const {lightMode, showMenu, toggleMenu} = useContext(ThemeContext)

  const fetchGameVideos = async isMounted => {
    if (showMenu) {
      toggleMenu()
    }

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

    if (response.ok && isMounted) {
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

  useEffect(() => {
    let isMounted = true

    fetchGameVideos(isMounted)

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        return <FailureView fetchVideos={fetchGameVideos} />
      default:
        return null
    }
  }

  return (
    <div className="body-main">
      <div
        className="page-heading"
        style={{backgroundColor: lightMode ? '#ebebeb' : '#212121'}}
      >
        <FaGamepad
          className={`section-icon ${lightMode ? '' : 'dark'}`}
          style={{backgroundColor: lightMode ? '#cbd5e1' : '#181818'}}
        />
        <MenuItem
          lightMode={lightMode}
          style={{fontSize: '25px', fontWeight: 'bold'}}
        >
          Gaming
        </MenuItem>
      </div>
      <div className="gaming-videos-container">{renderGamingPage()}</div>
    </div>
  )
}

export default Gaming
