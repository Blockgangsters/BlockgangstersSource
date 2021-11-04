import styled from "@emotion/styled/macro";
import { breakpoint } from "./styles/theme/responsive/breakpoint";

export const PageWrapper = styled.div`
    width: 100vw;
    max-height: 100%;
    padding: 0 0;
    background: rgba(16,21,34,.9);

    ${breakpoint.m} {
        margin-left: 20vw;
        width: 80vw;
    }
`

export const Container = styled.div`
    z-index: 1;
    box-sizing: border-box; 
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin-left: 0;
    width: 100vw;
    

    ${breakpoint.m} {
        padding-right: 50px;
        padding-left: 50px;
        margin: auto;
        
    }

`

export const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);

