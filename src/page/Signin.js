import React from 'react'
import EmailInput from '../component/EmailInput'
import PasswordInput from '../component/PasswordInput'
import styled from 'styled-components'
import { COLORS } from '../styles/colors'
import { useState } from 'react'
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
const DisabledBtn = styled.button`
    background: ${COLORS.coolgray002};
    color: ${COLORS.white};
    padding:16px;
    width: 232px;
    margin : 16px;
`
function Signin() {
    const [isEmailRight, setEmailRight] = useState(false);
    const [isPasswordRight, setPasswordRight] = useState(false);
  return (
    <RootCont>
        <Cont>
            <EmailInput setSubmitable={setEmailRight}/>
            <PasswordInput setSubmitable={setPasswordRight}/>
            {isEmailRight && isPasswordRight ? <Btn>제출</Btn> : <DisabledBtn disabled>제출</DisabledBtn>}
        </Cont>
    </RootCont>
  )
}

export default Signin
