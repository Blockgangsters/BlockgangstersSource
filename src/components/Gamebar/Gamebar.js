import 'bootstrap/dist/css/bootstrap.min.css'
import styled from '@emotion/styled/macro';
import { BootstrapSlots } from './bootstrapslots/ui/BootstrapSlots';
import { GameNavigation } from './gamenavigation/ui/GameNavigation';
import { GameStats } from './gamestats/ui/GameStats';
import { MetaMaskConnect } from '../Navbar/metamaskconnect/MetaMaskConnect';

const Gamebar = () => {
    return (
        <StyledGamebar>
            <MetaMaskConnect />
            <BootstrapSlots />
            <GameNavigation />
            <GameStats />
        </StyledGamebar>

    )
}

export default Gamebar

const StyledGamebar = styled.div`
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
    box-sizing: border-box;
`