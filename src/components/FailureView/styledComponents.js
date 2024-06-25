import styled from 'styled-components'

export const WarningHeading = styled.h3`
  color: ${props => (props.lightMode ? '#231f20' : '#fff')};
  margin: 5px;
`

export const WarningDescription = styled.p`
  color: ${props => (props.lightMode ? '#475569' : '#94a3b8')};
  margin: 5px;
  text-align: center;
`
