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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const url = 'https://www.pre-onboarding-selection-task.shop/auth/signin';
    const onSubmit = () => {
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          })
          .then(response => response.json())
          .then(result => {
            console.log(result);
            alert(`email: ${email} password: ${password}`);
          })
          .catch(error => {
            console.error(error);
          });
    }
  return (
    <RootCont>
        <Cont>
            <EmailInput setSubmitable={setEmailRight} setParent={setEmail} />
            <PasswordInput setSubmitable={setPasswordRight} setParent={setPassword}/>
            {isEmailRight && isPasswordRight ? <Btn onClick={onSubmit}>로그인</Btn> : <DisabledBtn disabled>로그인</DisabledBtn>}
        </Cont>
    </RootCont>
  )
}

export default Signin