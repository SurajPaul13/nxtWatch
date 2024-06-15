import {useState, useContext, useMemo} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoIosSearch} from 'react-icons/io'
import NavBar from '../NavBar'
import constants from '../constants'
import {ThemeContext} from '../../ThemeContext'
import HomeVideoThumbnail from '../HomeVideoThumbnail'
import {
  SearchInput,
  FailureHeading,
  FailureDescription,
} from './styledComponents'
import './index.css'
import MenuContainer from '../MenuContainer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const Home = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [homeVideos, setHomeVideos] = useState([])
  const [showIntro, hideIntro] = useState(true)
  const [search, setSearch] = useState('')
  const {lightMode} = useContext(ThemeContext)
  const {logoIcon, failureView} = constants

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
    if (response.ok) {
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

  useMemo(() => {
    fetchHomeVideos()
  }, [])

  const closePopUp = () => hideIntro(false)

  const handleSearch = event => {
    const {value} = event.target
    setSearch(value)
  }

  const retrySearch = () => {
    setSearch('')
  }

  const RenderLoader = () => (
    <div className="loader-container">
      <Loader
        type="ThreeDots"
        color={`${lightMode ? '#000' : '#fff'}`}
        height="50"
        width="50"
      />
    </div>
  )

  const NoSearchResults = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
        alt="no videos"
        height="300px"
        className="failure-img"
      />
      <FailureHeading lightMode={lightMode}>
        No search results found
      </FailureHeading>
      <FailureDescription lightMode={lightMode}>
        Try different keyword or remove search filter
      </FailureDescription>
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

    return (
      <div className="home-videos-container">
        {updatedVideos.map(eachVideo => (
          <HomeVideoThumbnail
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
  }

  const FailureView = () => (
    <div className="failure-view-container">
      <img
        src={`${lightMode ? failureView.light : failureView.dark}`}
        alt="failure view"
        height="300px"
        className="failure-img"
      />
      <FailureHeading lightMode={lightMode}>
        Oops! Something Went Wrong
      </FailureHeading>
      <FailureDescription lightMode={lightMode}>
        We are having some trouble to complete your request.
      </FailureDescription>
      <FailureDescription lightMode={lightMode}>
        Please try again
      </FailureDescription>
      <button className="retry-btn" type="button" onClick={fetchHomeVideos}>
        Retry
      </button>
    </div>
  )

  const renderPageContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <RenderLoader />

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
      className="home"
      style={{backgroundColor: lightMode ? '#f9f9f9' : '#181818'}}
    >
      <NavBar />
      <div className="home-container">
        <div className="medium-screen-menu-container">
          <MenuContainer />
        </div>
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
