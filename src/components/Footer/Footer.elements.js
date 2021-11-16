import styled from '@emotion/styled/macro'
import { Link } from 'react-router-dom';

import { breakpoint } from '../../styles/theme/responsive/breakpoint';

export const FooterContainer = styled.div`
    background-color:rgba(16,21,34,.9);
    padding: 4rem 0 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    ${breakpoint.m} {
        margin-left: 20%;
    }
`;

export const FooterSubscription = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
`;

export const FooterSubHeading = styled.p`
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial', 'sans-serif';
    font-size: 24px;
`;

export const FooterSubText = styled.p`
    font-size: 20px;
`


export const FooterLinkTitle = styled.h2`
`

export const FooterLink = styled(Link)`
    color: #fff;
    text-decoration: none;

&:hover {
    color: #0467fb;
    transition: 0.3s ease out;
}`

export const SocialMedia = styled.section`
    width: 100%;
`

export const SocialMediaWrap = styled.div`
    display: flex;
    justify-content: space-between; //alignment of items on main axis. So here we keep space between but align-items holds centered @ cross axis
    align-items: center; // default alignment for all items inside container -- along the cross axis!
    width: 90%;
    margin: 40px auto 0 auto;
    flex-direction: column;

    ${breakpoint.m} {
        flex-direction: row;
    }
`

export const SocialLogo = styled(Link)`
    color: #fff;
    justify-self: start; //the surrounding box gave this box for example 1000 px width, but box is only 300px. In this case justify-self puts it left/middle/center etc
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
`

export const SocialIcon = styled.img` //FaMagento is the logo 
    margin-right: 10px;
    box-sizing: border-box;
    max-height: 50px;
    max-width: 50px; //resize to 50px in footer
`


export const WebsiteRights = styled.small`
    color: #fff;
    align-items: center;
`

export const SocialIcons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 240px;
`

export const SocialIconLink = styled.a`
    color: #fff;
    font-size: 24px;
`

export const Ulist = styled.ul`
    color: #fff;
    font-size: 14px;
    list-style-type: none;
`

export const Uitem = styled.li`
    color: #fff;
    font-size: 14px;
`
