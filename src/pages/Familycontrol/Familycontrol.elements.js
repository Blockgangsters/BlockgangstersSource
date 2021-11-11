import styled from 'styled-components/macro';

//TokenomicsContainer is around whole page, sets background etc.


//TokenomicsContainer is around whole page, sets background etc.
export const CrimeContainer = styled.div`
max-width: 90%;
max-height: 100%;
padding: 0px 40px;
justify-content: space-around;
flex-direction: row; // this is standard, fit from left to right
display: flex;
color: white;

@media screen and (max-width: 768px) {
    padding-bottom: 65px;
};
`

//TokenomicsContainer is around whole page, sets background etc.
export const Title = styled.h1`
max-width: 100%;
max-height: 10%;

padding: 160px 40px 0px 40px;
justify-content: space-around;
flex-direction: row; // this is standard, fit from left to right
display: relative;
color: white;
vertical-align: text-top;

@media screen and (max-width: 768px) {
    padding-bottom: 65px;
};
`
export const TitleTwo = styled.h1`
max-width: 100%;
max-height: 10%;

padding: 0px 40px 0px 40px;
justify-content: space-around;
flex-direction: row; // this is standard, fit from left to right
display: relative;
color: white;
vertical-align: text-top;

@media screen and (max-width: 768px) {
    padding-bottom: 65px;
};
`


export const SubTitle = styled.h4`
max-width: 100%;
max-height: 10%;

padding: 20px 40px 0px 40px;
justify-content: space-around;
flex-direction: row; // this is standard, fit from left to right
display: relative;
color: white;
vertical-align: text-top;

@media screen and (max-width: 768px) {
    padding-bottom: 65px;
};
`
export const Img = styled.img`
border-radius: 10px;
max-width: 70%;
height: auto;
margin-left: 50px;
`

export const LeaveButton = styled.button`
border-radius: 4px;
background: red;
white-space: nowrap;
padding: 10px 20px;
color: #fff;
font-size: 16px;
outline: none;
border: none;
cursor: pointer;

&:hover {
    transition: all 0.3s ease-out;
    background: #581B1C;
}

@media screen and (max-width: 960px) {
    width: 200px;
}
`