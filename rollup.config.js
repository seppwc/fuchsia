import path from 'path';
// import chalk from 'chalk'
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const packageDir = path.resolve(
	String(__dirname),
	'packages',
	String(process.env.TARGET),
);

const resolve = p => path.resolve(packageDir, p);

function createConfig() {
	// if (!output) {
	// 			console.log(chalk.yellow(`invalid format: "${format}" `))
	// 			process.exit(1)
	// }

	const tsPlugin = typescript({
		clean: true,
		tsconfig: path.resolve(packageDir, 'tsconfig.json'),
	});

	const terserPlugin = terser();

	return {
		input: resolve('src/index.ts'),
		plugins: [tsPlugin, terserPlugin],
		output: {
			file: resolve(`dist/${process.env.TARGET}.js`),
			format: 'es',
		},
		treeshake: {
			moduleSideEffects: false,
		},
	};
}

export default createConfig();
