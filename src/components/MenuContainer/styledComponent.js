import styled from 'styled-components'

const MenuItem = styled.p`
  color: ${props => (props.lightMode ? '#000' : '#fff')};
`
export default MenuItem
