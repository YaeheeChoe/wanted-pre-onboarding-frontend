import React from 'react'
import styled from 'styled-components'
const RootCont = styled.div`
    margin: 8px;
`
const Input = styled.input`
    width: 200px;
`
const Label = styled.label`
    display:block;
    text-align:right;
    font-size: 12px;
`
function EmailInput() {
  return (
    <RootCont>
        <Input data-testid="email-input" placeholder='email' />
        <Label>
        </Label>
    </RootCont>
  )
}

export default EmailInput
