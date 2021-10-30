import styled from 'styled-components';

//TokenomicsContainer is around whole page, sets background etc.
export const PageWrapper = styled.div`
max-width: 100%;
max-height: 100%;
padding: 0 0; // no padding, thats in the container
background: rgba(16,21,34,.9);
margin-left: 20vw;
`

//TokenomicsContainer is around whole page, sets background etc.
export const CrimeContainer = styled.div`
max-width: 70%;
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

export const SubTitle = styled.p`
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