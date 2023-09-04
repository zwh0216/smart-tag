#!/usr/bin/env node

const Commander = require('commander')
const { autoTag } = require('../scripts/')

const commander = new Commander.Command()

commander.version('0.0.1', '-v, --version').option('-p, --production', 'tag auto ++', autoTag).parse(process.argv);
