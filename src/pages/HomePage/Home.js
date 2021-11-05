import styled from '@emotion/styled/macro';
import InfoSection from '../../components/InfoSection/InfoSection'
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data'
const Home = () => {
    return (
        <StyledHome>
            <InfoSection  {...homeObjOne} />
            <InfoSection  {...homeObjTwo} />
            <InfoSection  {...homeObjThree} />
            <InfoSection  {...homeObjFour} />
        </StyledHome>
    )
}

export default Home;

const StyledHome = styled.div`

`

