import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.bgColor};
  padding: 20px;
  width: 100%;
`

export const FormElement = styled.form`
  margin: auto;
  background-color: ${props => props.bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  box-shadow: 3px 5px 10px #212121;
  border-radius: 10px;
  min-width: 360px;
  width: 80%;

  @media (min-width: 768px) {
    width: 600px;
  }
`

export const Label = styled.label`
  color: #64748b;
  font-weight: bold;
  font-family: 'Roboto';
  font-size: 14px;
  margin-bottom: 5px;
`

export const LoginInput = styled.input`
  height: 30px;
  padding-left: 10px;
  outline: none;
`
