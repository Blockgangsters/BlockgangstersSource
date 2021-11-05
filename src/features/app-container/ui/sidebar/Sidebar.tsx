import React, { FC } from 'react';

import styled from '@emotion/styled/macro'
import { ZIndex } from '../../../../styles/globals/ZIndex';
import { breakpoint } from '../../../../styles/theme/responsive/breakpoint';
import { Colors } from '../../../../styles/theme/colors/Colors';

export const Sidebar: FC = ({ children }) => {
	return (
		<StyledSidebar>
			<StyledSidebarMenu>
				{children}
			</StyledSidebarMenu>
		</StyledSidebar>
	);
};


const StyledSidebar = styled.div`
	position: absolute;
	box-sizing: border-box;
	
`;

const StyledSidebarMenu = styled.div`
	height: 100vh;
	position: fixed;
	z-index: ${ZIndex.Sidebar};
    width: 20vw;
	top: 0;
	overflow-y: auto;
	opacity: 0;
	transform: translateX(25%);
	pointer-events: none;
    margin-top: 80px;

	background-color: ${Colors.DarkTransparant};

	::-webkit-scrollbar {
		display: none;
	}

	${breakpoint.m} {
		transform: translateX(0);
		opacity: 1;
		pointer-events: initial;
	}


`;