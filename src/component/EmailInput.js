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


function EmailInput(props) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const regex = /@/;
        return regex.test(email);
    };

    const handleChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        const isSubmitable = validateEmail(newEmail);
        props.setSubmitable(isSubmitable);
        props.setParent(newEmail);
        if (isSubmitable) {
        setError('');
        } else {
        setError('올바른 이메일 폼을 입력하세요');
        }
    };
  return (
    <RootCont>
        <Input data-testid="email-input" type="email" value={email} onChange={handleChange} placeholder='email' />
        {error && <Label>{error}</Label>}
    </RootCont>
  )
}

export default EmailInput
