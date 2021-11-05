import styled from "@emotion/styled/macro";
import { Colors } from "./styles/theme/colors/Colors";
import { breakpoint } from "./styles/theme/responsive/breakpoint";

export const PageWrapper = styled.div`
    width: 100vw;
    max-height: 100%;
    padding: 0 0;
    background: ${Colors.DarkTransparant};

    ${breakpoint.m} {
        margin-left: 20vw;
        width: 80vw;
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

