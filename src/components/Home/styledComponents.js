import styled from 'styled-components'

export const HomeVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 100%;
`

export const WarningHeading = styled.h3`
  color: ${props => (props.lightMode ? '#231f20' : '#fff')};
  margin: 5px;
`

export const WarningDescription = styled.p`
  color: ${props => (props.lightMode ? '#475569' : '#94a3b8')};
  margin: 5px;
`

export const SearchInput = styled.input`
  display: inline-block;
  padding-left: 10px;
  width: 85%;
  outline: none;
  border: 1px solid #a9a2a2;
  height: 100%;
  color: ${props => (props.lightMode ? '#181818' : '#f9f9f9')};
  background-color: ${props => (props.lightMode ? '#f9f9f9' : '#181818')};
`

export const ContactUsHeading = styled.h3`
  color: ${props => (props.lightMode ? '' : '')};
`
