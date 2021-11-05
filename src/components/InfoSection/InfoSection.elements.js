import styled from '@emotion/styled/macro'



export const BootstrapWrapper = styled.div`
    display: flex;
    color: black;

`

export const BootstrapText = styled.div`
    color: black;
    font-size: 20px;

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


