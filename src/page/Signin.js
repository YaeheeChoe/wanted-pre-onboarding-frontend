import React from 'react'
import EmailInput from '../component/EmailInput'
import PasswordInput from '../component/PasswordInput'
import styled from 'styled-components'
const RootCont =styled.div`
    
    width:100%;
    height:100%;
`
const Cont = styled.div`
    position: absolute;
    width: 200px;
    top: calc(50% - 100px);
    left: calc(50% - 100px);
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
