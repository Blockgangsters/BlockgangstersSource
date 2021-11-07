import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import videobackground from './videobackground.mp4';
import { FontStyles } from "./globalStyles";
import styled from "@emotion/styled/macro";

const Video = styled.video`
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: -2;
    overflow: hidden;
    margin: 0; 
    padding: 0; 
    top: 0; 
    bottom:0; 
    right: 0; 
    left: 0;
`;

ReactDOM.render(
    <React.StrictMode>
        <Video className='videoTag' autoPlay playsInline loop muted>
            <source src={videobackground} type='video/mp4' />
        </Video>
        <FontStyles />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
