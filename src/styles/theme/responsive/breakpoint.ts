import { IResponsive } from './IResponsiveValue';
import { breakpointSetting } from './settings';

type Key = keyof IResponsive;
export const breakpoint = Object.keys(breakpointSetting)
	.map((key) => [key, breakpointSetting[key as Key]] as [Key, number])
	.reduce(
		(prev, [key, width]) => ({
			...prev,
			...{ [key]: `@media (min-width: ${width}px)` },
		}),
		{} as IResponsive<string>,
	);
