import {useContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import {ThemeContext} from '../../ThemeContext'
import {MenuItem} from '../../components/MenuContainer/styledComponent'
import {apiStatusConstants} from '../../components/constants'
import './index.css'
import LoaderComponent from '../../components/LoaderComponent'
import FailureView from '../../components/FailureView'
import NoSearchResults from '../../components/NoSearchResults'
import VideoSection from '../../components/VideoSection'
import SearchComponent from '../../components/SearchComponent'

const Trending = () => {
  const [trendingVideos, setTrendingVideos] = useState([])
  const [search, setSearch] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const {lightMode, showMenu, toggleMenu} = useContext(ThemeContext)

  const handleSearch = event => {
    const {value} = event.target
    setSearch(value)
  }

  const retrySearch = () => {
    setSearch('')
  }

  useEffect(() => {
    let isMounted = true

    const fetchTrendingVideos = async () => {
      if (showMenu) {
        toggleMenu()
      }
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

      if (response.ok && isMounted) {
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

    fetchTrendingVideos()
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const TrendingVideos = () => {
    const updatedVideos = trendingVideos.filter(eachVideo =>
      eachVideo.title.toLowerCase().includes(search.toLowerCase()),
    )

    if (updatedVideos.length < 1) {
      return <NoSearchResults retrySearch={retrySearch} />
    }

    return <VideoSection videos={updatedVideos} />
  }

  const renderPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <LoaderComponent />
      case apiStatusConstants.success:
        return <TrendingVideos />
      case apiStatusConstants.failure:
        return <FailureView />

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
        <FaFire
          className={`section-icon ${lightMode ? '' : 'dark'}`}
          style={{backgroundColor: lightMode ? '#cbd5e1' : '#181818'}}
        />
        <MenuItem
          lightMode={lightMode}
          style={{fontSize: '25px', fontWeight: 'bold'}}
        >
          Trending
        </MenuItem>
      </div>
      <div className="videos-and-search-container">
        <SearchComponent handleSearch={handleSearch} search={search} />
        {renderPage()}
      </div>
    </div>
  )
}

export default Trending
