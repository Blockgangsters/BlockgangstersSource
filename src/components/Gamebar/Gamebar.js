import 'bootstrap/dist/css/bootstrap.min.css'
import styled from '@emotion/styled/macro';

import { MetaMaskConnect } from '../Navbar/metamaskconnect/MetaMaskConnect';

import { BootstrapSlots } from './bootstrapslots/ui/BootstrapSlots';
import { GameNavigation } from './gamenavigation/ui/GameNavigation';
import { GameStats } from './gamestats/ui/GameStats';

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