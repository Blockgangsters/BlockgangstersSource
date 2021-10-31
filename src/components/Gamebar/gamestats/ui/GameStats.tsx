import React from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar'
import NumberFormat from "react-number-format";
import { EthContext } from '../../../../App';
import styled from '@emotion/styled/macro';

export const GameStats = () => {

    const [defenseState, , attackState, , , , , , inGameFunds, , jailSeconds, attorneySeconds, attackSeconds, crimeSeconds, trainSeconds, crowdfundSeconds, , , , protectionHours] = React.useContext(EthContext);
    return (
        <StyledGameStats>
            <LevelsItem>
                Defense level: {Math.floor(defenseState / 1000000)}<ProgressBar animated variant="success" now={(defenseState % 1000000) / 10000} label={`${(defenseState % 1000000) / 10000}%`} />
                Attack level: {Math.floor(attackState / 1000000)} <ProgressBar animated variant="danger" now={attackState % 1000000 / 10000} label={`${(attackState % 1000000) / 10000}%`} />
                {jailSeconds === 0 ? <small style={{ color: 'green' }}> Not in jail </small> : <small style={{ color: 'red' }}> Jailed ({jailSeconds})</small>}<br />
                {attorneySeconds === 0 ? <small style={{ color: 'green' }}> Attorney available </small> : <small style={{ color: 'red' }}> Attorney used ({attorneySeconds}) </small>}<br />
                {attackSeconds > 0 ? <small style={{ color: 'red' }}> Attack cooldown ({attackSeconds})</small> : <small style={{ color: 'green' }}> Attack available</small>}<br />
                {crimeSeconds > 0 ? <small style={{ color: 'red' }}> Crime cooldown ({crimeSeconds})</small> : <small style={{ color: 'green' }}> Crime available</small>}<br />
                {trainSeconds > 0 ? <small style={{ color: 'red' }}> Training cooldown ({trainSeconds})</small> : <small style={{ color: 'green' }}> Training available</small>}<br />
                {crowdfundSeconds > 0 ? <small style={{ color: 'red' }}> Crowdfund time left ({crowdfundSeconds})</small> : <small style={{ color: 'green' }}> Crowdfund available</small>}<br />
                {protectionHours > 0 ? <small style={{ color: 'green' }}> {protectionHours} hours protection </small> :<small style={{ color: 'yellow' }}> Unprotected</small>}<br />

                <NumberFormat
                    value={inGameFunds}
                    displayType={"text"}
                    decimalSeparator={"."}
                    thousandSeparator={true}
                    decimalScale={4}
                    prefix={"₲: "} />
            </LevelsItem>

        </StyledGameStats>
    )
}

export const StyledGameStats = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
`

export const LevelsItem = styled.div`
    line-height: 25px;
    color: white;
`