import {useContext} from 'react'
import {IoIosSearch} from 'react-icons/io'
import {ThemeContext} from '../../ThemeContext'
import SearchInput from './styledComponents'
import './index.css'

const SearchComponent = props => {
  const {handleSearch, search} = props

  const {lightMode} = useContext(ThemeContext)

  return (
    <div className="search-container">
      <SearchInput
        lightMode={lightMode}
        type="search"
        placeholder="Search"
        onChange={handleSearch}
        value={search}
      />
      <button type="button" className="search-btn">
        <IoIosSearch style={{color: lightMode ? '' : 'a9a2a2'}} alt="search" />
      </button>
    </div>
  )
}

export default SearchComponent
