import styled from "@emotion/styled/macro";
import { Colors } from "./styles/theme/colors/Colors";
import { breakpoint } from "./styles/theme/responsive/breakpoint";
import Godfather from "./styles/fonts/Godfather.eot";
import Godfather2 from "./styles/fonts/Godfather.svg";
import Godfather3 from "./styles/fonts/Godfather.ttf";
import Godfather4 from "./styles/fonts/Godfather.woff";
import Godfather5 from "./styles/fonts/Godfather.woff2";
import { createGlobalStyle } from "styled-components";

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

export const FontStyles = createGlobalStyle`
@font-face {
    font-family: 'The Godfather';
    src: url(${Godfather}#iefix) format('embedded-opentype'),
        url(${Godfather5}) format('woff2'),
        url(${Godfather4}) format('woff'),
        url(${Godfather3}) format('truetype'),
        url(${Godfather2}) format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
`;