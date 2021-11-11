import React from 'react';

import styled from "@emotion/styled/macro";
import ReactDOM from 'react-dom';

import App from './App';
import videobackground from './videobackground.mp4';

const Video = styled.video`
    position: fixed;
    top: 50%; 
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    min-width: 100%; 
    min-height: 100%; 
    width: auto; 
    height: auto;
    z-index: -1000; 
    overflow: hidden;
`

ReactDOM.render(
    <React.StrictMode>
        <Video className='videoTag' autoPlay playsInline loop muted>
            <source src={videobackground} type='video/mp4' />
        </Video>

        <App />
    </React.StrictMode>,
    document.getElementById('root')
);