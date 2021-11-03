import styled from 'styled-components';

//TokenomicsContainer is around whole page, sets background etc.
export const CrimeContainer = styled.div`
max-width: 90%;
max-height: 100%;
padding: 0px 40px;
justify-content: space-around;
flex-direction: column; // this is standard, fit from left to right
display: flex;
color: white;

@media screen and (max-width: 768px) {
    padding-bottom: 65px;
};
`

//TokenomicsContainer is around whole page, sets background etc.
export const ChartContainer = styled.div`
width: 100%;
max-height: 100%;
padding: 0px 40px;
justify-content: center;
align-items: center;
flex-direction: column; // this is standard, fit from left to right
display: flex;
color: white;

@media screen and (max-width: 768px) {
    padding-bottom: 65px;
};
`

//TokenomicsContainer is around whole page, sets background etc.
export const SelectContainer = styled.div`
width: 80%;
max-height: 100%;
padding: 0px 40px;
justify-content: center;
align-items: center;
align-self: center;
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

//TokenomicsContainer is around whole page, sets background etc.
export const SubTitle = styled.h4`
max-width: 100%;
max-height: 10%;
margin-bottom: -20px;
justify-content: space-around;
flex-direction: row; // this is standard, fit from left to right
display: relative;
color: white;
vertical-align: text-top;
`
