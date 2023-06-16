import React from 'react'
import EmailInput from '../component/EmailInput'
import PasswordInput from '../component/PasswordInput'
import styled from 'styled-components'
const RootCont =styled.div`
    position: absolute;
    width :300px;
    height: 300px;
    top: calc(50% - 100px);
    left: calc(50% - 150px);
`
const Cont = styled.div`
    display:flex;
    flex-direction:column;
`;


function Signin() {
  return (
    <RootCont>
        <Cont>
            <EmailInput/>
            <PasswordInput/>
        </Cont>
    </RootCont>
  )
}

export default Signin
