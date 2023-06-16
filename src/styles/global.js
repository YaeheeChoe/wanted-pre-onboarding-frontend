import { createGlobalStyle } from 'styled-components' 
import { COLORS } from './colors'
export default createGlobalStyle`
    html {
        height: 100%;
    }
    input{
        background: ${COLORS.coolgray001};
        border: none;
        padding: 16px;
        border-radius: 12px;
        color: ${COLORS.coolgray003};
    }
    input::placeholder{
        color: ${COLORS.coolgray002};
    }
    textarea:focus, input:focus {
        color: ${COLORS.coolgray003};
        outline: none;
    }
    body {
    }
`