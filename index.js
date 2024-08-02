#!/usr/bin/env node
import { Command } from 'commander';
import analyze from './lib/analyze.js';
import fs from 'node:fs';
const program = new Command();

program
    .version('11.1.0')
    .description('Scan the stupid code')
    .option('-p, --path <name>', 'Specify the dir path')
    .option('-c, --code <code>', 'Specify the code')
    .option('-s, --sourceType <type>', 'Specify js source type', 'module')
    .option('-o, --output <name>', 'Specify the output path', 'output.json')

program.parse(process.argv);

const options = program.opts();

if (!options.path) {
    console.log(`Run with --path to specify the path.`);
} else if (!options.code) {
    console.log('Run with --code to specify the code.');
} else if (!fs.statSync(options.path).isDirectory()) {
    console.log(`The path is not a directory.`);
} else {
    analyze(options);
}