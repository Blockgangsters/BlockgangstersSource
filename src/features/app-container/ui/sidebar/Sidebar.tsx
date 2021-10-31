import React, { FC } from 'react';

import styled from '@emotion/styled/macro'
import { ZIndex } from '../../../../styles/globals/ZIndex';

export const Sidebar: FC = ({ children }) => {
    return (
        <StyledSidebar>
            <StyledSidebarMenu isSidebarVisible={true}>

                <StyledSidebarContent>{children}</StyledSidebarContent>
            </StyledSidebarMenu>
        </StyledSidebar>
    );
};


const StyledSidebar = styled.div`
	position: absolute;
`;

const StyledSidebarMenu = styled.div<{ isSidebarVisible: boolean }>`
	height: 100vh;
	position: fixed;
	z-index: ${ZIndex.Sidebar};
    max-width: 20%;
	top: 0;
	width: 100%;
	overflow-y: auto;
	opacity: 0;
	transform: translateX(25%);
	pointer-events: none;
	transition: all 0.4s ease;
    background-color:rgba(16,21,34,.9);
    margin-top: 80px;

	::-webkit-scrollbar {
		display: none;
	}


	${(props) =>
        props.isSidebarVisible &&
        `
		transform: translateX(0);
		opacity: 1;
		pointer-events: initial;
	`}
`;

const StyledSidebarContent = styled.div`

`;
