import React, { useEffect } from 'react';

import { ethers } from 'ethers';
import NumberFormat from "react-number-format";

import { StateContext, EthContext } from '../../App';
import { joinOrUprankFamily, leaveFamily, getMemberFamilyIndex, getFamilyNames, getFamilyOwner, getFamilyRank, getAllFamilyMembers, startFamily, getFamilyBank, distributeFamilyBank, getFamilyDefBonus, getFamilyAttBonus } from '../../components/EthFamilyFunctions';
import { SubmitButton } from '../../features/shared/ui/buttons/SubmitButton';
import { ColoredLine, PageWrapper } from '../../globalStyles'

import { CrimeContainer, Title, TitleTwo, SubTitle, LeaveButton } from './Familycontrol.elements';


const Familycontrol = () => {
    const [, , mmConnected, , ,] = React.useContext(StateContext);
    const [defenseState, , attackState, , , , , , , , , , , , , , , , ,] = React.useContext(EthContext);

    const [familyName, setFamilyName] = React.useState("");
    const [myFamilyName, setMyFamilyName] = React.useState("");

    const [entreeFee, setEntreeFee] = React.useState();
    const [missionFee, setMissionFee] = React.useState();
    const [familyOwner, setFamilyOwner] = React.useState();
    const [familyRank, setFamilyRank] = React.useState();
    const [familyBank, setFamilyBank] = React.useState();
    const [familyTransferInput, setFamilyTransferInput] = React.useState();
    const [receiverAddress, setReceiverAddress] = React.useState();

    const [allFamilyMembers, setAllFamilyMembers] = React.useState([]);
    const [familyAttackBonus, setFamilyAttackBonus] = React.useState();
    const [familyDefenseBonus, setFamilyDefenseBonus] = React.useState();
    const [myFamilyIndex, setMyFamilyIndex] = React.useState();


    const onChangeHandlerEntree = event => {
        setEntreeFee(event);
    };

    const onChangeHandlerMission = event => {
        setMissionFee(event);
    };

    const onChangeHandlerTransfer = event => {
        setFamilyTransferInput(event);
    };


    useEffect(() => {
        const fetchEvents = async () => {
            if (mmConnected) {
                let familyId = await getMemberFamilyIndex();
                let familyIdNumber = familyId.toNumber();

                setMyFamilyIndex(familyIdNumber);
                let FamilyNames = await getFamilyNames();

                if (FamilyNames.length > 0 && familyIdNumber !== 0) {
                    let familyNameString = ethers.utils.parseBytes32String(FamilyNames[familyIdNumber - 1]);

                    setMyFamilyName(familyNameString)
                }
                let familyOwner = await getFamilyOwner(familyIdNumber);

                console.log("fam owner: ", familyOwner)
                setFamilyOwner(familyOwner)
                let familyRank = await getFamilyRank(); // if rank = 80 -> youre the boss

                setFamilyRank(familyRank.toNumber())
                console.log(familyRank.toNumber())


                let familyBank = await getFamilyBank(familyIdNumber);

                setFamilyBank(familyBank.toNumber())
                let allMembers = await getAllFamilyMembers(familyIdNumber);

                setAllFamilyMembers(allMembers)

                let defBonus = await getFamilyDefBonus();

                setFamilyDefenseBonus(defBonus.toNumber());
                let attBonus = await getFamilyAttBonus();

                setFamilyAttackBonus(attBonus.toNumber());
            }
        }

        fetchEvents();
    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s


    let levelArray = [10, 30, 50, 70];
    let statsArray = [0, 74, 124, 199];

    //<Input type="submit" value="Submit" />
    return (
        <PageWrapper>
            <Title> Family control page </Title><br />
            <SubTitle> Current Family: {familyOwner === "0x0000000000000000000000000000000000000000" ? "Not in a family" : <> {myFamilyName} <LeaveButton onClick={() => { leaveFamily() }}> Leave family </LeaveButton></>}</SubTitle>
            <SubTitle> Current family bank: <NumberFormat value={familyBank} displayType={"text"} thousandSeparator={true} prefix={"₲ "} /> </SubTitle>
            <SubTitle> Current family rank: {familyRank === 80 ? "Boss" : (familyRank === 70 ? "Underboss" : (familyRank === 50 ? "Caporegime" : (familyRank === 30 ? "Soldier" : (familyRank === 10 ? "Associate" : "Not in a family"))))}</SubTitle>
            <SubTitle> Number of family members: {familyOwner === 0x0000000000000000000000000000000000000000 ? "Not in a family" : allFamilyMembers.length}</SubTitle>
            <SubTitle> Family attack bonus: {familyAttackBonus}</SubTitle>
            <SubTitle> Family defense bonus: {familyDefenseBonus}</SubTitle>
            {statsArray[levelArray.indexOf(familyRank)] < (defenseState + attackState) / 1000000 ? <LeaveButton onClick={() => { joinOrUprankFamily(myFamilyIndex) }}> Uprank!</LeaveButton> : null}

            <ColoredLine color="red" />


            {familyRank === 80 ? <><TitleTwo> Transfer from bank to player balance: </TitleTwo><SubTitle>Amount to transfer:
                <NumberFormat
                    thousandsGroupStyle="thousand"
                    value={familyTransferInput}
                    prefix="₲"
                    displayType="input"
                    type="text"
                    thousandSeparator={true}
                    allowNegative={false}
                    onValueChange={({ value }) => {
                        onChangeHandlerTransfer(value)
                    }} />

                Address:
                <input type="text" value={receiverAddress} onChange={value => setReceiverAddress(value.target.value)} />
                <SubmitButton onClick={() => { distributeFamilyBank(receiverAddress, familyTransferInput) }}> Go for it! </SubmitButton>

            </SubTitle>  <ColoredLine color="red" /> </> : null}

            <CrimeContainer>




                {familyRank === 0 ?
                    <><TitleTwo>Start a family!</TitleTwo> <ul><li>  Family Name:        <input placeholder={"Enter a name.."} type="text" value={familyName} onChange={value => setFamilyName(value.target.value)} />
                    </li><li> Entree fee ({'>'}0)
                            <NumberFormat
                                placeholder={"Enter entree fee.."}
                                thousandsGroupStyle="thousand"
                                value={entreeFee}
                                prefix="₲"
                                decimalSeparator="."
                                displayType="input"
                                type="text"
                                thousandSeparator={true}
                                allowNegative={false}
                                onValueChange={({ value }) => {
                                    onChangeHandlerEntree(value)
                                }} />
                        </li><li>
                            Family cut on income: (0-100%): <NumberFormat
                                placeholder={"Enter family cut.."}
                                thousandsGroupStyle="thousand"
                                value={missionFee}
                                decimalSeparator="."
                                displayType="input"
                                type="text"
                                thousandSeparator={true}
                                allowNegative={true}
                                onValueChange={({ value }) => {
                                    onChangeHandlerMission(value)
                                }} />

                            <SubmitButton onClick={() => { startFamily(familyName, entreeFee, missionFee) }}> Start your family! </SubmitButton>

                        </li></ul></> : null}
            </CrimeContainer>


        </PageWrapper>

    )
}

export default Familycontrol
