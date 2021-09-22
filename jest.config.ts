import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
	return {
		coverageDirectory: './coverage',
		preset: 'ts-jest',
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
