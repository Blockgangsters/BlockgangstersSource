import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import videobackground from './videobackground.mp4';

import styled from "styled-components";

const Video = styled.video`
position: fixed;
min-height: 100%;
min-width: 100%;
max-height: 100%;
max-width: 100%;
object-fit: contain;

z-index: -2;

@media screen and (max-width: 960px) {

}
`;

ReactDOM.render(
    <React.StrictMode>

<App />
    </React.StrictMode>,
    document.getElementById('root')
    );
