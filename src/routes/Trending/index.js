import {useContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import {IoIosSearch} from 'react-icons/io'
import {ThemeContext} from '../../ThemeContext'
import MenuItem from '../../components/MenuContainer/styledComponent'
import {apiStatusConstants} from '../../components/constants'
import './index.css'
import LoaderComponent from '../../components/LoaderComponent'
import FailureView from '../../components/FailureView'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/Sidebar'
import {SearchInput} from '../Home/styledComponents'
import VideoSection from '../../components/VideoSection'

const Trending = () => {
  const [trendingVideos, setTrendingVideos] = useState([])
  const [search, setSearch] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const {lightMode} = useContext(ThemeContext)

  const handleSearch = event => {
    const {value} = event.target
    setSearch(value)
  }

  useEffect(() => {
    let isMounted = true

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
  }, [])

  const renderPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <LoaderComponent />
      case apiStatusConstants.success:
        return <VideoSection videos={trendingVideos} />
      case apiStatusConstants.failure:
        return <FailureView />

      default:
        return null
    }
  }

  return (
    <div
      className="bg-container"
      style={{backgroundColor: lightMode ? '#f9f9f9' : '#0f0f0f'}}
    >
      <NavBar />
      <div className="body-container">
        <SideBar />
        <div style={{width: '100%'}}>
          <div className="page-heading">
            <FaFire className={`menu-icon ${lightMode ? '' : 'dark'}`} />
            <MenuItem lightMode={lightMode}>Trending</MenuItem>
          </div>
          <div className="videos-and-search-container">
            <div className="search-container">
              <SearchInput
                lightMode={lightMode}
                type="search"
                placeholder="Search"
                onChange={handleSearch}
                value={search}
              />
              <button type="button" className="search-btn">
                <IoIosSearch
                  style={{color: lightMode ? '' : 'a9a2a2'}}
                  alt="search"
                />
              </button>
            </div>
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trending
