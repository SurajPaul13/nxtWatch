import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import {iconConstants, apiStatusConstants} from '../../components/constants'
import LoaderComponent from '../../components/LoaderComponent'
import VideoSection from '../../components/VideoSection'
import FailureView from '../../components/FailureView'
import NoSearchResults from '../../components/NoSearchResults'
import SearchComponent from '../../components/SearchComponent'
import {ThemeContext} from '../../ThemeContext'
import './index.css'

const Home = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [homeVideos, setHomeVideos] = useState([])
  const [showIntro, hideIntro] = useState(true)
  const [search, setSearch] = useState('')
  const {logoIcon} = iconConstants
  const {showMenu, toggleMenu} = useContext(ThemeContext)

  const fetchHomeVideos = async isMounted => {
    if (showMenu) {
      toggleMenu()
    }
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
          id: data.id,
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

  useEffect(() => {
    let isMounted = true

    fetchHomeVideos(isMounted)

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const closePopUp = () => hideIntro(false)

  const handleSearch = event => {
    const {value} = event.target
    setSearch(value)
  }

  const retrySearch = () => {
    setSearch('')
  }

  const HomeBanner = () => (
    <div className={`intro-card ${showIntro ? '' : 'hide-intro'}`}>
      <div style={{display: 'flex'}}>
        <img
          height="25px"
          width="105px"
          src={logoIcon.light}
          alt="nxt watch logo"
        />
        <button
          className="close-intro-popup"
          type="button"
          onClick={closePopUp}
        >
          X
        </button>
      </div>

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
      return <NoSearchResults retrySearch={retrySearch} />
    }

    return <VideoSection videos={updatedVideos} />
  }

  const renderPageContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <LoaderComponent />

      case apiStatusConstants.success:
        return <HomeVideos />

      case apiStatusConstants.failure:
        return <FailureView fetchVideos={fetchHomeVideos} />

      default:
        return null
    }
  }

  return (
    <div className="body-main">
      <HomeBanner />
      <div className="videos-and-search-container">
        <SearchComponent handleSearch={handleSearch} search={search} />
        {renderPageContent()}
      </div>
    </div>
  )
}

export default Home
