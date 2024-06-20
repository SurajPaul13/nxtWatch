import styled from 'styled-components'

const getBgColor = props => {
  if (props.isActive) {
    if (props.lightMode) {
      return '#cbd5e1'
    }
    return '#606060'
  }
  return 'transparent'
}

const setColor = props => {
  if (props.lightMode) {
    if (props.isActive) {
      return 'red'
    }
    return '#000'
  }
  return props.isActive ? 'red' : '#fff'
}

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  padding-left: 20px;
  outline: none;
  border: none;
  background-color: ${props => getBgColor(props)};
  width: 100%;
  cursor: pointer;
  color: ${props => setColor(props)};

  &:hover {
    background-color: ${props => (props.lightMode ? '#cbd5e1' : '#606060')};
  }

  & svg {
    height: 20px !important;
    width: 20px !important;
    margin-right: 20px;
  }

  & p {
    font-weight: ${props => (props.isActive ? 'bold' : '')};
  }
`

export const MenuItem = styled.p`
  color: ${props => (props.lightMode ? '#000' : '#fff')};
  font-size: 14px;
`
