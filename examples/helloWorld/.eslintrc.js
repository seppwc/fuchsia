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
        '@fuchsiajs/eslint-config'
	],
	ignorePatterns: ['**/node_modules/**'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', '@fuchsiajs/eslint-config'],
};
