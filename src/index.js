import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import videobackground from './videobackground.mp4';

import styled from "@emotion/styled/macro";

const Video = styled.video`
    position: fixed;
    min-height: 100%;
    min-width: 100%;
    z-index: -2;
`;

ReactDOM.render(
    <React.StrictMode>
        <Video className='videoTag' autoPlay playsInline loop muted>
            <source src={videobackground} type='video/mp4' />
        </Video>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
