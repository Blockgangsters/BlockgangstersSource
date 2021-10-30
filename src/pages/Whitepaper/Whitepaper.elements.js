import styled from 'styled-components'

//flex-wrap: squeeze items together to fit or start at new line. nowrap = squeeze, flex-wrap = new line

//TokenomicsContainer is around whole page, sets background etc.
export const PageWrapper = styled.div`
max-width: 100%;
max-height: 100%;
padding: 0 0; // no padding, thats in the tokenomicscontainer
background: rgba(16,21,34,.9);
margin-left: 20vw;

`

//TokenomicsContainer is around whole page, sets background etc.
export const PDFContainer = styled.div`
max-width: 100%;
max-height: 100%;
padding: 160px 0 0 0 ;
flex-direction: column; // this is standard, fit from left to right
display: flex;
color: white;
justify-content: center;
align-self: center;
@media screen and (max-width: 768px) {
    padding-bottom: 65px;
};
`

export const TextBox = styled.div`
padding: 10px 10px 10px 10px;
align-self: center;
`

export const PDFBox = styled.div`
padding: 10px 10px 10px 10px;
align-self: center;
`