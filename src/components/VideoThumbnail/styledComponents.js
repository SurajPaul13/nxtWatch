import styled from 'styled-components'

export const VideoTitle = styled.p`
  color: ${props => (props.lightMode ? '#000' : '#fff')};
  margin: 0;
  line-height: 1.5;
  font-size: 12px;
`
export const VideoDescription = styled.p`
  color: ${props => (props.lightMode ? '#475569' : '#94a3b8')};
  font-size: 10px;
  margin-top: 10px;
`
