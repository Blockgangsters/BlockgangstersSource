import styled from '@emotion/styled/macro'
import { Link } from 'react-router-dom';
import { breakpoint } from '../../styles/theme/responsive/breakpoint';

export const StyledInfoSection = styled.div`
    color: #fff;
    background: ${({ lightBg }) => (lightBg ? 'rgba(255,255,255,.9);' : 'rgba(16,21,34,.9);')};
    padding: 0;
    

    ${breakpoint.m} {
        width: 80vw;
        margin-left: 20vw;
        padding: ${({ firstBlock }) => (firstBlock ? '160px 50px' : '60px 50px')};
    }
`

export const InfoRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;

    ${breakpoint.m} {
        flex-direction: row;
    }
`

export const InfoColumn = styled.div`
    display: flex;
    
    ${breakpoint.l} {
        justify-content: center;
        width: 50%;
    }
`

export const TextWrapper = styled.div`
    max-width: 100%;
    padding-top: 0;
    padding-bottom: 65px;
    align-items: center;
    justify-items: center;

    ${breakpoint.m} {
        padding-bottom: 60px;
    }
`

export const ReleaseWrapper = styled.div`
    
    padding-top: 0;
    padding-bottom: 65px;
    justify-items: center;
    align-items: center;

    ${breakpoint.m} {
        padding-bottom: 60px;
    }
`

export const TitleWrapper = styled(Link)`
    padding-top: 0;
    text-decoration: none;
    padding-bottom: 65px;
    color: white;
    animation: neon 1s ease-in-out infinite alternate;

    @keyframes neon {
        from {
            text-shadow:
            0 0 6px rgba(202,228,225,0.92),
            0 0 30px rgba(202,228,225,0.34),
            0 0 54px rgba(30,132,242,0.92);
        }
        to {
            text-shadow:
            0 0 6px rgba(202,228,225,0.98),
            0 0 30px rgba(202,228,225,0.42),
            0 0 22px rgba(30,132,242,0.84),

        }
    }

    ${breakpoint.m} {
        padding-bottom: 60px;
    }
`

export const BootstrapWrapper = styled.div`
    max-width: 800px;
    padding-top: 0;
    padding-bottom: 65px;
    flex-direction: row;
    display: inline-block;
    color: black;

    ${breakpoint.m} {
        padding-bottom: 60px;
    }
`

export const BootstrapText = styled.h4`
color: black;
font-size: 30px;
margin-left: 10px;
margin-right: 30px;
display: inline-block;
`


export const CircleWrapper = styled.div`
max-width: 100%;
padding-top: 0;
padding-bottom: 60px;
display: flex;
justify-content: center;
transform: scale(80%);
@media screen and (max-width: 768px) {
    padding-bottom: 65px;
};
`

export const TopLine = styled.div`
color: ${({ lightTopLine }) => (lightTopLine ? '#a9b3c1' : '#4B59F7')};
font-size: 18px;
line-height: 16px;
letter-spacing: 1.4px;
margin-bottom: 16px;
`;

export const TitleBox = styled.div`
color: white;
padding-top: 50px;
font-size: 32px;
line-height: 16px;
letter-spacing: 1.4px;
margin-bottom: 30px;
text-align: center;
`;

export const TimerText = styled.div`
color: white;
font-size: 24px;
line-height: 16px;
letter-spacing: 1.4px;
margin-bottom: 16px;
text-align: center;
`;

export const Heading = styled.h1`
margin-bottom: 24px;
font-size: 48px;
line-height: 1.1;
color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#1c2237')};
`

export const Subtitle = styled.p`
max-width: 440px;
margin-bottom: 35px;
font-size: 18px;
line-height: 24px;
color: ${({ lightTextDesc }) => (lightTextDesc ? '#a9b3c1' : '#1c2237')};
`



export const Img = styled.img`
    max-width: 100%;
    max-height: 100;
`

export const SocialIcons = styled.div`
display: flex;
margin-top: 50px;
justify-content: center;
align-items: center;
`

export const SocialIconLink = styled.a`
color: #fff;
font-size: 24px;
margin-left: 30px;
margin-right: 30px;
`


