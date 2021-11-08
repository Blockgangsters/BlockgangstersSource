import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import videobackground from './videobackground.mp4';
import { FontStyles } from "./globalStyles";
import styled from "@emotion/styled/macro";

const Video = styled.video`
    position: fixed;
    z-index: -2;
@media (min-aspect-ratio: 16/9) {
  Video {
    height: 300%; top: -100%;
    /* or height: 200%; top: -50%;
       or height: 400%; top: -150%; */
  }
}
@media (max-aspect-ratio: 16/9) {
  Video {
    width: 300%; left: -100%;
    /* or width: 200%; left: -50%;
       or width: 400%; left: -150%; */
  }

`;

const Overflow = styled.div`

`;


ReactDOM.render(
  <React.StrictMode>
    <Video className='videoTag' autoPlay playsInline loop muted>
      <source src={videobackground} type='video/mp4' />
    </Video>
    <FontStyles />
    <App />
    <Overflow />
  </React.StrictMode>,
  document.getElementById('root')
);
