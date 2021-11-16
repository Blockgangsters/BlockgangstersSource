import styled from "@emotion/styled/macro";

import { Colors } from "./styles/theme/colors/Colors";
import { breakpoint } from "./styles/theme/responsive/breakpoint";


export const PageWrapper = styled.div`
    width: 100%;
    max-height: 100%;
    padding: 0 0;
    background: ${Colors.DarkTransparant};

    ${breakpoint.m} {
        margin-left: 20%;
        width: 80%;
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
