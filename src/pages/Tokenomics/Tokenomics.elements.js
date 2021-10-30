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
export const TokenomicsContainer = styled.div`
max-width: 100%;
max-height: 100%;
padding: 160px 0;
justify-content: space-around;
flex-direction: row; // this is standard, fit from left to right
display: flex;

@media screen and (max-width: 768px) {
    padding-bottom: 65px;
};
`
//Chartwrapper is upper left, contains chart
export const ChartWrapper = styled.div`
max-width: 700px;
justify-content: center;
display: flex;
position: relative;
flex-direction: column; // to put the title above the chart (instead of next to each other, = row)
`

//ChartTitle is above the chart, inside the chartwrapper
export const ChartTitle = styled.p`
max-width: 700px;
justify-content: center;
display: flex;
position: relative;
`

//TextWrapper is upper right, contains text explaining the chart
export const TextWrapper = styled.div`
max-width: 800px;
padding-top: 0;
padding-bottom: 60px;
display:flex;
justify-content: top;
position: relative; 
color: white;
flex-direction: column; // This way the heading, subtitle and text are below eachother


@media screen and (max-width: 768px) {
    padding-bottom: 65px;
};
`

export const TopLine = styled.div`
color: #a9b3c1;
font-size: 18px;
line-height: 16px;
letter-spacing: 1.4px;
margin-bottom: 0px;
`;

export const Heading = styled.h1`
margin-bottom: 24px;
font-size: 48px;
line-height: 1.1;
color: #f7f8fa;
`

export const UnorderedList = styled.ul`
padding-left: 20px;
`

export const ListItem = styled.li`
padding-left: 5px;
`

//AllocationContainer is around whole page (below TokenomicsContainer), sets background etc.
export const AllocationContainer = styled.div`
max-width: 100%;
max-height: 100%;
padding: 0 0 0 0; // set the pie chart to 0 but text is (as standard) set to 160 px
background-color: rgba(255, 255, 255,.6);
justify-content: space-around;
flex-direction: row; // this is standard, fit from left to right
display: flex;
`

//Chartwrapper is upper left, contains chart
export const PieWrapper = styled.div`
max-width: 700px;
justify-content: center;
display: flex;
position: relative;
flex-direction: column; // to put the title above the chart (instead of next to each other, = row)
`

//ChartTitle is above the chart, inside the chartwrapper
export const PieTitle = styled.p`
max-width: 700px;
margin-left: 150px;
display: flex;
position: relative;
`

export const TopLinePie = styled.div`
color: #4B59F7;
font-size: 18px;
line-height: 16px;
letter-spacing: 1.4px;
position: absolute;
margin-top: 120px;

`;


//TextWrapper is upper right, contains text explaining the chart
export const PieTextWrapper = styled.div`
max-width: 800px;
padding: 160px 0 0 0; // top right bottom left
display:flex;
justify-content: top;
position: relative; 
color: #1c2237;
flex-direction: column; // This way the heading, subtitle and text are below eachother

@media screen and (max-width: 768px) {
    padding-bottom: 65px;
};
`

export const HeadingPie = styled.h1`
margin-bottom: 24px;
font-size: 48px;
line-height: 1.1;
color: #1c2237;
`

