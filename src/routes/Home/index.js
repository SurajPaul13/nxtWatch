import {useState, useContext, useEffect} from 'react'
import Cookies from 'js-cookie'
import {IoIosSearch} from 'react-icons/io'
import NavBar from '../../components/NavBar'
import {iconConstants, apiStatusConstants} from '../../components/constants'
import {ThemeContext} from '../../ThemeContext'
import LoaderComponent from '../../components/LoaderComponent'
import VideoSection from '../../components/VideoSection'
import FailureView from '../../components/FailureView'
import SideBar from '../../components/Sidebar'
import {
  SearchInput,
  WarningHeading,
  WarningDescription,
} from './styledComponents'
import './index.css'

const Home = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [homeVideos, setHomeVideos] = useState([])
  const [showIntro, hideIntro] = useState(true)
  const [search, setSearch] = useState('')
  const {lightMode} = useContext(ThemeContext)
  const {logoIcon} = iconConstants

  useEffect(() => {
    let isMounted = true

    const fetchHomeVideos = async () => {
      setApiStatus(apiStatusConstants.loading)

      const jwtToken = Cookies.get('jwt-token')
      const url = 'https://apis.ccbp.in/videos/all?search='
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, options)
      if (response.ok && isMounted) {
        const {videos} = await response.json()

        const convertedData = videos.map(data => {
          const {channel} = data
          return {
            id: channel.id,
            name: channel.name,
            profileImageUrl: channel.profile_image_url,
            publishedAt: data.published_at,
            thumbnailUrl: data.thumbnail_url,
            title: data.title,
            viewCount: data.view_count,
          }
        })
        setHomeVideos(convertedData)

        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    }

    fetchHomeVideos()

    return () => {
      isMounted = false
    }
  }, [])

  const closePopUp = () => hideIntro(false)

  const handleSearch = event => {
    const {value} = event.target
    setSearch(value)
  }

  const retrySearch = () => {
    setSearch('')
  }

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
      <button className="retry-btn" type="button" onClick={retrySearch}>
        Retry
      </button>
    </div>
  )

  const HomeBanner = () => (
    <div className={`intro-card ${showIntro ? '' : 'hide-intro'}`}>
      <button className="close-intro-popup" type="button" onClick={closePopUp}>
        X
      </button>
      <img
        height="35px"
        width="155px"
        src={logoIcon.light}
        alt="nxt watch logo"
      />
      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
      <button className="get-it-now-btn" type="button">
        GET IT NOW
      </button>
    </div>
  )

  const HomeVideos = () => {
    const updatedVideos = homeVideos.filter(eachVideo =>
      eachVideo.title.toLowerCase().includes(search.toLowerCase()),
    )

    if (updatedVideos.length < 1) {
      return <NoSearchResults />
    }

    return <VideoSection videos={homeVideos} />
  }

  const renderPageContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <LoaderComponent />

      case apiStatusConstants.success:
        return <HomeVideos />

      case apiStatusConstants.failure:
        return <FailureView />

      default:
        return null
    }
  }

  return (
    <div
      className="main-app"
      style={{backgroundColor: lightMode ? '#f9f9f9' : '#181818'}}
    >
      <NavBar />
      <div className="home-container">
        <SideBar />
        <div className="banner-and-videos-container">
          <HomeBanner />
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
            {renderPageContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
