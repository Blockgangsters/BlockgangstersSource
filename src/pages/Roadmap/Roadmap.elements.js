import styled from 'styled-components'
import {FaGripLines} from 'react-icons/fa';
import {MdDone, MdWatchLater} from 'react-icons/md';
export const InfoSec = styled.div`
color: #fff;
padding: 160px 0;
margin-left: 20vw;

background: ${({lightBg}) => (lightBg ? 'rgba(255,255,255,.9);' : 'rgba(16,21,34,.9);')};
@media screen and (max-width: 768px) {
    margin: 0;
};
`


export const IconToDo = styled(MdWatchLater)` //FaMagento is the logo 
margin-right: 0.5rem;
box-sizing: border-box;
max-height: 100%;
`

export const IconFinished = styled(MdDone)` //FaMagento is the logo 
margin-right: 0.5rem;
box-sizing: border-box;
max-height: 100%;
`

export const IconProgress = styled(FaGripLines)` //FaMagento is the logo 
margin-right: 0.5rem;
box-sizing: border-box;
max-height: 100%;
`