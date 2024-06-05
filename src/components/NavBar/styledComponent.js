import styled from 'styled-components'

const MenuItem = styled.p`
  color: ${props => (props.lightTheme ? '#fff' : '#000')};
`
export default MenuItem
