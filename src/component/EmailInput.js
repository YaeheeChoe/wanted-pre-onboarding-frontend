import React from 'react'
import styled from 'styled-components'
const RootCont = styled.div`
    display:flex;
    justify-content: center;
`
const Input = styled.input`
    width: 200px;
    border-radius: 12px 0px 0px 12px;
`
const Btn = styled.button`
    width: 56px;
    border-radius: 0px 12px 12px 0px;

`
function EmailInput() {
  return (
    <RootCont>
        <Input data-testid="email-input" placeholder='email' />
        <Btn>제출</Btn>
    </RootCont>
  )
}

export default EmailInput
