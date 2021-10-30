import React, { useCallback, useState }  from 'react';
import {TokenomicsContainer, ChartWrapper, TextWrapper, TopLine, Heading, ChartTitle, ListItem, UnorderedList, PageWrapper, AllocationContainer, PieWrapper, PieTitle, HeadingPie, TopLinePie, PieTextWrapper} from './Tokenomics.elements';
import {dataSet, data} from './Data' 
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Sector} from 'recharts';

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${(percent * 100).toFixed(0)}%`}</text>
    </g>
  );
};


const Tokenomics = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
    return (

      <PageWrapper>
        <TokenomicsContainer>

          <ChartWrapper>
            <ChartTitle><TopLine>Total Supply (aim 1T after 2 years)</TopLine></ChartTitle>
              <AreaChart
                width={500}
                height={350}
                data={dataSet}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Team" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="Bootstrap" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="Rewards" stackId="1" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ChartWrapper>
          <TextWrapper>
            
            <Heading>Total Supply</Heading>
            No hard cap is set to the max supply of ₲. The reason is that playing the game should be encouraged and as such, inflating the game against passive holders is incentivised. The following shares are programmed into the game:
            <UnorderedList>
              <ListItem>180,000,000,000 (180B) Team Tokens: Team tokens are released (vested) over the course of 15 months.</ListItem>
              <ListItem>150,000,000,000 (150B, maximum) tokens can be bought to bootstrap early adaptors. This option is locked automatically after 1 month / 1000 participants.</ListItem>
              <ListItem>Rewards from playing the game.</ListItem>
            </UnorderedList>
          
          </TextWrapper>
        </TokenomicsContainer>

        <AllocationContainer>
          <PieTextWrapper>
            
            <HeadingPie>Team allocation</HeadingPie>
              <UnorderedList>
                <ListItem>20% Marketing.</ListItem>
                <ListItem>30% reserved for (future) team salaries.</ListItem>
                <ListItem>10% reserved for funding LINK balance of contract.</ListItem>
                <ListItem>20% external audits.</ListItem>
                <ListItem>20% long term treasury.</ListItem>
              </UnorderedList>
          </PieTextWrapper>
          <PieWrapper>
            <PieTitle><TopLinePie>Allocation of the team-reserved tokens</TopLinePie></PieTitle>
            <PieChart width={600} height={600}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx={300}
                cy={300}
                innerRadius={80}
                outerRadius={110}
                fill="#4B59F7"
                dataKey="value"
                onMouseEnter={onPieEnter}
              />
            </PieChart>
            </PieWrapper>
          
        </AllocationContainer>
   </PageWrapper>
    )
}

export default Tokenomics