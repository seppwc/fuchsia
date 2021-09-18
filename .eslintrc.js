module.exports = {
	env: {
		browser: true,
		node: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	ignorePatterns: ['**/node_modules/**'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'no-console': 'off',
		'indent': ['warn', 'tab'],
		'linebreak-style': ['error', 'unix'],
		'quotes': ['warn', 'single'],
		'semi': ['warn', 'always'],
	},
};
