#!/usr/bin/env node

const program = require('commander');
// const { getPdf } = require('./pdf');
const { getDoc } = require('./docx');

program
    .version('0.0.1')
    .description('Pdf & Docx Generator from Json');

program
    .command('getDoc')
    .alias('pdf')
    .description('Pdf Generator')
    .action(() => getDoc(1));

program
    .command('getDoc')
    .alias('docx')
    .description('Docx Generator')
    .action(() => getDoc());

if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
    program.outputHelp();
    process.exit();
}

program.parse(process.argv);