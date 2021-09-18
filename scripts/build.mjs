import execa from 'execa';
import minimist from 'minimist';
import chalk from 'chalk';

const args = minimist(process.argv.slice(2));
const targets = args._;

async function run() {
	console.clear();
	await build(targets[0]);
}

async function build(target) {
	try {
		console.log(chalk.yellow(`building: ${target}`));
		await execa(
			'rollup',
			['-c', '--environment', [`TARGET:${target}`].filter(Boolean).join(',')],
			{ stdio: 'inherit' },
		);
	} catch (err) {
		console.error(err);
	}
}

run();
