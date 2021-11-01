import React, { FC } from 'react';

import styled from '@emotion/styled/macro'
import { ZIndex } from '../../../../styles/globals/ZIndex';
import { breakpoint } from '../../../../styles/theme/responsive/breakpoint';

export const Sidebar: FC = ({ children }) => {
    return (
        <StyledSidebar>
            <StyledSidebarMenu>

                <StyledSidebarContent>{children}</StyledSidebarContent>
            </StyledSidebarMenu>
        </StyledSidebar>
    );
};


const StyledSidebar = styled.div`
	position: absolute;
`;

const StyledSidebarMenu = styled.div`
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
    background-color:rgba(16,21,34,.9);
    margin-top: 80px;

	::-webkit-scrollbar {
		display: none;
	}

	${breakpoint.m} {
		transform: translateX(0);
		opacity: 1;
		pointer-events: initial;
	}


`;

const StyledSidebarContent = styled.div`

`;
