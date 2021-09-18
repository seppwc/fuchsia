import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
	return {
		preset: 'ts-jest',
		coverageDirectory: './coverage',
		testMatch: ['**/?(*.)+(test|spec).ts'],
		resetMocks: true,
		clearMocks: true,
		transform: {
			'^.+\\.ts?$': 'ts-jest',
		},
		globals: {
			'ts-jest': {
				tsconfig: 'tsconfig.json',
			},
		},
	};
};