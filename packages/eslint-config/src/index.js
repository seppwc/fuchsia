module.exports = {
	env: {
		browser: true,
		node: true,
		jest: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	ignorePatterns: ['**/node_modules/**'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'react'],
	rules: {
		'no-console': 'warn',
		'indent': ['warn', 'tab'],
		'linebreak-style': ['error', 'unix'],
		'quotes': ['warn', 'single'],
		'semi': ['warn', 'always'],
		'react/jsx-uses-vars': 'error',
	},
	settings: {
		react: {
			pragma: 'h',
		},
	},
};
