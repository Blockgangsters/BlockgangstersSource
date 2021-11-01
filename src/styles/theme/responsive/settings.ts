import { IResponsiveValue } from './IResponsiveValue';

export const breakpointSetting: Required<Omit<
	IResponsiveValue<number>,
	'default'
>> = {
	xl: 1200,
	l: 992,
	m: 768,
	s: 576,
};

