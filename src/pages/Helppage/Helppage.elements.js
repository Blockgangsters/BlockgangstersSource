import styled from 'styled-components'

//TokenomicsContainer is around whole page, sets background etc.
export const TokenomicsContainer = styled.div`
max-width: 100vw;
max-height: 100vh;
padding: 160px 0 0 0 ;
justify-content: space-around;
flex-direction: row; // this is standard, fit from left to right
display: flex;

@media screen and (max-width: 768px) {
    padding-bottom: 65px;
};
`


//ChartTitle is above the chart, inside the chartwrapper
export const ChartTitle = styled.p`
max-width: 100vw;
justify-content: center;
display: flex;
position: relative;
`

//TextWrapper is upper right, contains text explaining the chart
export const TextWrapper = styled.div`
max-width: 100vw;
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
max-width: 100vw;
max-height: 100vh;
padding: 0 0 0 0; // set the pie chart to 0 but text is (as standard) set to 160 px
background: rgba(255,255,255,.7);
justify-content: space-around;
flex-direction: row; // this is standard, fit from left to right
display: flex;
`

//TextWrapper is upper right, contains text explaining the chart
export const PieTextWrapper = styled.div`
max-width: 800px;
padding: 30px 0 60px 0; // top right bottom left
display:ínline;
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
export const Hyperlink = styled.a`
color: white;
display:inline;
white-space: nowrap;
text-decoration: underline;

`

export const HyperlinkWhite = styled.a`
color: black;
display:inline;
text-decoration: underline;

`
