import styled from 'styled-components'

export const EmotionButton = styled.button`
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  margin-right: 15px;
  color: ${props => (props.lightMode ? '' : '#fff')};
  color: ${props => (props.isActive ? 'blue' : '')};
  font-size: 12px;
  background-color: transparent;
  cursor: pointer;
`
