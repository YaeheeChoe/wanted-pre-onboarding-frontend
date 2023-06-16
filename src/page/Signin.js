import React from 'react'
import EmailInput from '../component/EmailInput'
import PasswordInput from '../component/PasswordInput'
import styled from 'styled-components'
import { COLORS } from '../styles/colors'
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
    align-items:center;
`;

const Btn = styled.button`
    background: ${COLORS.primary};
    color: ${COLORS.white};
    padding:16px;
    width: 232px;
    margin : 16px;
`
function Signin() {
  return (
    <RootCont>
        <Cont>
            <EmailInput/>
            <PasswordInput/>
            <Btn>제출</Btn>
        </Cont>
    </RootCont>
  )
}

export default Signin
