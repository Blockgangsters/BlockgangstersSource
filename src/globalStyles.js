// main CSS file

import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box; // inner boxes are nicely fit in outer box
        padding: 0;
        font-family: 'Source Sans Pro', sans-serif;
    }
`;

export const Container = styled.div`
    z-index: 1;
    border: 50px;
    width: 100%;
    max-width: 1700px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 50px;
    padding-left: 50px;
    
    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`

export const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);



export const Button = styled.button`
    border-radius: 4px;
    background: ${({ primary }) => (primary ? '#4B59F7' : '#0467FB')};
    white-space: nowrap;
    padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
    color: #fff;
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease-ease-out;
        background: #fff;
        background: ${({ primary }) => (primary ? '#0467FB' : '#4B59F7')};
    }

    @media screen and (max-width: 960px) {
        width: 200px;
    }
`

export const GameButton = styled.button`
    border-radius: 4px;
    background: #4B59F7;
    height: 200px;
    width: 200px;
    white-space: nowrap;
    padding: '10px 20px';
    color: #fff;
    font-size: '16px';
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        transition: all 1.0s ease-ease-out;
        background: #616189;
    }

    @media screen and (max-width: 960px) {
        width: 200px;
    }
`

export const SubmitButton = styled.button`
    border-radius: 4px;
    background: #4B59F7;
    height: 38px;
    width: 150px;
    white-space: nowrap;
    padding: '10px 20px';
    color: #fff;
    font-size: '16px';
    outline: none;
    border: none;
    cursor: pointer;
    justify-self: center;

    &:hover {
        transition: all 1.0s ease-ease-out;
        background: #616189;
    }

    @media screen and (max-width: 960px) {
        width: 200px;
    }
`

export default GlobalStyle