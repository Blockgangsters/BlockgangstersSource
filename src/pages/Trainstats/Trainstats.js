import { CrimeContainer, Title, SubTitle } from './Trainstats.elements';
import React from 'react';
import { Statstraining } from '../../components/EthFunctions';
import { EthContext } from '../../App';
import { PageWrapper } from '../../globalStyles'
import { SubmitButton } from '../../features/shared/ui/buttons/SubmitButton';
import Select from 'react-select'

const Trainstats = () => {
    const [, , , , , , , , , , jailSeconds, , , crimeSeconds, trainSeconds] = React.useContext(EthContext);

    const [inputValue, setInputValue] = React.useState(1);

    const options = [
        { value: '1', label: 'Weights training' },
        { value: '2', label: 'Boxing training' },
        { value: '3', label: 'Self-defense classes' }
    ]

    const onChangeHandler = event => {
        setInputValue(event.value);
    };



    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '2px dotted blue',
            color: state.isSelected ? 'white' : 'black',
            backgroundColor: state.isSelected ? 'blue' : 'white',
            "&:hover": {
                backgroundColor: "lightgrey"
            }
        }),
        control: (provided) => ({
            ...provided,
            marginTop: "",
        }),
        container: base => ({
            ...base,
            flex: 1
        })
    }


    //<Input type="submit" value="Submit" />
    return (
        <PageWrapper>
            <Title> Train stats </Title><br />
            <SubTitle> The following stats are trained: <ul><li> Weights training: 100% attack</li><li>Boxing training: 50% attack & 50% defense</li><li>Self-defense classes: 100% defense</li></ul></SubTitle>

            <CrimeContainer>
                {jailSeconds === 0 && crimeSeconds === 0 && trainSeconds === 0 ?
                    <><Select defaultValue={options[0]} options={options} onChange={onChangeHandler} styles={customStyles} /> <SubmitButton onClick={() => { Statstraining(inputValue) }}> Go for it! </SubmitButton> </> : "You are not ready yet!"}

            </CrimeContainer>

        </PageWrapper>

    )
}

export default Trainstats
