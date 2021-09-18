import chalk from 'chalk';
import execa from 'execa';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));
const targets = args._;

async function run() {
	if (!targets[0]) {
		console.error(
			chalk.red('No package specificed to watch'),
			'- please specify a package to watch with',
			chalk.yellow('yarn dev [package]'),
		);
		process.exit(1);
	}
	await watch(targets[0]);
}

async function watch(target) {
	try {
		await execa(
			'rollup',
			[
				'-c',
				'-w',
				'--environment',
				[`TARGET:${target}`].filter(Boolean).join(','),
			],
			{ stdio: 'inherit' },
		);
	} catch (err) {
		console.error(err);
	}
}

run();
