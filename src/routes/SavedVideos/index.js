import {useContext, useEffect} from 'react'
import {CgPlayListAdd} from 'react-icons/cg'
import {ThemeContext} from '../../ThemeContext'
import {MenuItem} from '../../components/MenuContainer/styledComponent'
import NoSavedVideos from './NoSavedVideos'
import VideoSection from '../../components/VideoSection'

const SavedVideos = () => {
  const {lightMode, savedVideos, showMenu, toggleMenu} = useContext(
    ThemeContext,
  )

  useEffect(() => {
    if (showMenu) {
      toggleMenu()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedVideos])

  const RenderSavedVideos = () => {
    if (savedVideos.length === 0) {
      return <NoSavedVideos />
    }

    return <VideoSection videos={savedVideos} />
  }

  return (
    <div className="body-main">
      <div
        className="page-heading"
        style={{backgroundColor: lightMode ? '#ebebeb' : '#212121'}}
      >
        <CgPlayListAdd
          className={`section-icon ${lightMode ? '' : 'dark'}`}
          style={{backgroundColor: lightMode ? '#cbd5e1' : '#181818'}}
        />
        <MenuItem
          lightMode={lightMode}
          style={{fontSize: '25px', fontWeight: 'bold'}}
        >
          Saved Videos
        </MenuItem>
      </div>
      <div className="gaming-videos-container">{RenderSavedVideos()}</div>
    </div>
  )
}

export default SavedVideos
