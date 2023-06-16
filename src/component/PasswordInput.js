import React from 'react'
import styled from 'styled-components'

const RootCont = styled.div`
    display:flex;
    justify-content: center;
    margin: 8px;
`
const Input = styled.input`
    width: 200px;
`
function PasswordInput() {
  return (
    <RootCont>
        <Input data-testid="password-input" placeholder='password' />
    </RootCont>
  )
}

export default PasswordInput
