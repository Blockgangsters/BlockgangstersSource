import React from 'react';
import {InfoSec, IconFinished, IconToDo, IconProgress} from './Roadmap.elements';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const Roadmap = ({img, alt, start}) => {
    return (

              <InfoSec>
  <VerticalTimeline>


  <VerticalTimelineElement
    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
    icon={null}
  />

  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#232745', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #232745' }}
    date="Q1 2021"
    iconStyle={{ background: '#196F3D', color: '#fff' }}
    icon={<IconFinished />}
  >
    <h3 className="vertical-timeline-element-title">First version Smart Contract completed</h3>
  </VerticalTimelineElement>
 








<VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#232745', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #232745' }}
    date="Q2 2021"
    iconStyle={{ background: '#196F3D', color: '#fff' }}
    icon={<IconFinished />}
  >
    <h3 className="vertical-timeline-element-title">Smart Contract verification</h3>
    <p>Smart Contract is tested with the help of Hardhat.</p>

  </VerticalTimelineElement>


<VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#232745', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #232745' }}
    date="Q2 2021"
    iconStyle={{ background: '#196F3D', color: '#fff' }}
    icon={<IconFinished />}
  >
    <h3 className="vertical-timeline-element-title">Website is under construction.</h3>
    <p>React website under construction. Metamask is chosen as first supported wallet. Multi-wallet support scheduled 2022.</p>
  </VerticalTimelineElement>

<VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#232745', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #232745' }}
    date="Q3 2021"
    iconStyle={{ background: '#196F3D', color: '#fff' }}
    icon={<IconFinished />}
  >
    <h3 className="vertical-timeline-element-title">Chainlink VRF implemented.</h3>
    <p> Truely random numbers are of the highest priority. As such, every transaction is first logged within the BlockGangsters contract. Hereafter, Chainlink VRF is contacted, which will respond after 10 blocks. This way, an immutable random outcome is generated of each action. </p>
  </VerticalTimelineElement>

<VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#232745', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #232745' }}
    date="Q3 2021"
    iconStyle={{ background: '#196F3D', color: '#fff' }}
    icon={<IconFinished />}
  >
    <h3 className="vertical-timeline-element-title">Smart Contract Live on testnet</h3>
    <p>Contract is deployed on Polygon Mumbai testnet to further test game functions. </p>

  </VerticalTimelineElement>

<VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#232745', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #232745' }}
    date="Nov 1, 2021"
    iconStyle={{ background: '#196F3D', color: '#fff' }}
    icon={<IconFinished />}
  >
    <h3 className="vertical-timeline-element-title">Smart Contract Live on Polygon Mumbai</h3>
    <p>Transaction fees are currently too high on Ethereum for this transaction model. As such initial deployment is scheduled on Binance Smart Chain.</p>
  </VerticalTimelineElement>

<VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#232745', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #232745' }}
    date="Nov 16, 2021"
    iconStyle={{ background: '#9A7D0A', color: '#fff' }}
    icon={<IconProgress />}
  >
    <h3 className="vertical-timeline-element-title">Mainnet launch</h3>
    <p>To ensure everybody obtains a fair share of ₲, GANG is fairly launched on November 16, 2021. Extra tokens can be bought for 1 month after launch.</p>
  </VerticalTimelineElement>


<VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#232745', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #232745' }}
    date="Q1 2022"
    iconStyle={{ background: '#232745', color: '#fff' }}
    icon={<IconToDo />}
  >
    <h3 className="vertical-timeline-element-title">UI updates, collecting community feedback</h3>
    <p>The first quarter of 2022 will be used to iron out UI bugs. After community approval, the focus will be shifted towards game functionality updates.</p>
  </VerticalTimelineElement>


<VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#232745', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #232745' }}
    date="Q2/Q3 2022"
    iconStyle={{ background: '#232745', color: '#fff' }}
    icon={<IconToDo />}
  >
    <h3 className="vertical-timeline-element-title">Game functionality upgrades</h3>
    <p>The environment of the Ethereum ecosystem currently changes significantly. The team monitors closely for possibilities after the merge. The end goal is to launch on mainnet Ethereum with ERC-1155 functionality. That is, offer both ₲ tokens and NFT's from the same platform.</p>
  </VerticalTimelineElement>


</VerticalTimeline>
















</InfoSec>
    )
}

export default Roadmap