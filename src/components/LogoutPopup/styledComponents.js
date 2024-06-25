import styled from 'styled-components'

export const LogoutOption = styled.button`
  color: ${props => (props.confirm ? '#fff' : '#64748b')};
  background-color: ${props => (props.confirm ? '#3b82f6' : 'transparent')};
  border: solid 1px ${props => (props.confirm ? '#3b82f6' : '#64748b')};
  padding: 10px 20px 10px 20px;
  outline: none;
  cursor: pointer;
`
