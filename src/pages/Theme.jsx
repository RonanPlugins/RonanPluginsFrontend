
import styled from 'styled-components';


export const AuthPage = styled.div`
    height:100vh;
    width:100vw;
    color: black;
    background-color: #4D4459;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    `;

export const AuthContainer = styled.div`
    max-width:503px;
    margin-left:30px;
    margin-right:30px;
    background-color: #FFFFFF;
    text-align:center;
    padding-top:30px;
    padding-bottom:30px;
    border-radius:7px;
    border: solid 1px;
    border-color: #B2B0B0;
`;

export const AuthContent = styled.p`
        font-size:20px;
        font-family: 'DM Sans', sans-serif;
        margin-bottom:30px;
`
export const Logo = styled.img` 
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom:20px;
        width:105px;
        height:105px;
        border-radius:50%;
`
export const AuthButton = styled.button` 
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom:20px;
        margin-top:50px;
        width:281px;
        height:48px;
        background-color: #3E86F1;
        border-radius:6px;
        color:#FFFFFF;
    &:hover{
        background-color:#1056BF;
    }
`
export const FormInput = styled.input`
    width:388px;
    height:60px;
    padding-left: 15px;
    margin-left:10px;
    border-radius:9px;
    border: solid 1px;
    border-color: #B2B0B0;
    margin-bottom:20px;
    &.input-error{
        border: solid #EE6A6A;
    }
`

export const AdditionalButtons = styled.div`
text-align: center;
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-weight: 900;
    color: #868686; 
    width:503px;
`

export const BlueText = styled.p`
    display: inline;
    cursor: pointer;
    font-size:18px;
    color:#3E86F1;
    &:hover{
        color:#8A3AAF;
    }
`
export const FormError = styled.p`
    font-weight:700;
    padding-left: 65px;
    color: #EE6A6A;
    text-align:left;
`