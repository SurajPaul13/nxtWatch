import styled from 'styled-components'

const MenuItem = styled.p`
  color: ${props => (props.lightMode ? '#000' : '#fff')};
  font-size: 14px;
`
export default MenuItem
