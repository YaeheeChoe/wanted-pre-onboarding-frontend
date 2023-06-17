import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

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
function PasswordInput(props) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (password) => {
        const regex = /^.{8,}$/;
        return regex.test(password);
    };

    const handleChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const isSubmitable = validatePassword(newPassword);
        props.setSubmitable(isSubmitable);
        if (isSubmitable) {
        setError('');
        } else {
        setError('올바른 패스워드 폼을 입력하세요');
        }
    };
  return (
    <RootCont>
        <Input data-testid="password-input" type="password" value={password} onChange={handleChange} placeholder='password' />
        {error && <Label>{error}</Label>}
    </RootCont>
  )
}

export default PasswordInput
