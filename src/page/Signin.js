import React from 'react'
import EmailInput from '../component/EmailInput'
import PasswordInput from '../component/PasswordInput'
import styled from 'styled-components'
import { COLORS } from '../styles/colors'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
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
    const navigate = useNavigate();
    const url = 'https://www.pre-onboarding-selection-task.shop/auth/signin';
    useEffect(() => {
      const token = JSON.parse(localStorage.getItem('access_token'));
      if (token) {
        navigate('/todo');
      }
    }, []);
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
            if(result.access_token)
            {
              localStorage.setItem('access_token', result.access_token);
              console.log( result.access_token);
              navigate('/todo');
            }
            else
            {
              alert('올바른 ID, 비밀번호를 입력하세요. ');
            }
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