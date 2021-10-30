import styled from 'styled-components'
import {Link} from 'react-router-dom';

export const FooterContainer = styled.div`
    background-color:rgba(16,21,34,.9);
    padding: 4rem 0 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 20vw;
`;

export const FooterSubscription = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 24px;
    padding: 24px;
    color: #fff;
`;

export const FooterSubHeading = styled.p`
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial', 'sans-serif';
    margin-bottom: 24px;
    font-size: 24px;
`;

export const FooterSubText = styled.p`
    margin-bottom: 24px;
    font-size: 20px;
`
export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
@media screen and (max-width: 820px) {
    flex-direction: column;
    width: 80%auto;
}
`

export const FormInput = styled.input`
    padding: 10px 20px;
    border-radius: 2px;
    margin-right: 10px;
    outline: none;
    border: none;
    font-size: 16px;
    border: 1px solid #fff;

&::placeholder {
    color: #242424;
}

@media screen and (max-width: 820px) {
width: 100%;
    margin: 0 0 16px 0;

}
`

export const FooterLinksContainer = styled.div`
    width: 100%;
    max-width: 1300px;
    display: flex;
    justify-content: center;

@media screen and (max-width: 820px) {
    padding-top: 32px;
}`

export const FooterLinksWrapper = styled.div` //wrapper is to wrap into two columns when resizing
    display: flex;
    
@media screen and (max-width: 820px) {
    flex-direction: column;
}
`
// FooterLinksContainer -> FooterLinksWrapper -> FooterLinksItems -> Title+FooterLink. Dus footerlinksitems is 1 vd 3 boxes
export const FooterLinksItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 16px;
    text-align: left;
    width: 160px;
    box-sizing: border-box; // item stays neatly in surrounding container
    color: #fff;

@media screen and (max-width: 420px) {
    margin: 0;
    padding: 10px;
    width: 100%;

}
` 

export const FooterLinkTitle = styled.h2`
    margin-bottom: 16px;
`

export const FooterLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    margin-bottom: 0.5rem;

&:hover {
    color: #0467fb;
    transition: 0.3s ease out;
}`

export const SocialMedia = styled.section`
max-width: 1000px;
width: 100%;
`

export const SocialMediaWrap = styled.div`
display: flex;
justify-content: space-between; //alignment of items on main axis. So here we keep space between but align-items holds centered @ cross axis
align-items: center; // default alignment for all items inside container -- along the cross axis!
width: 90%;
max-width: 1000px;
margin: 40px auto 0 auto;

@media screen and (max-width: 820px) {
    flex-direction: column;
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
margin-bottom: 16px;
`

export const SocialIcon = styled.img` //FaMagento is the logo 
margin-right: 10px;
box-sizing: border-box;
max-height: 50px;
max-width: 50px; //resize to 50px in footer
`


export const WebsiteRights = styled.small`
color: #fff;
margin-left: 20px;
width: 600px;
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
