#!/usr/bin/env node

const { Command } = require('commander')
const { autoTag } = require('../scripts/')

const commander = new Command()

commander
  .version('0.0.1', '-v, --version')
  .option('-p, --production', 'tag auto ++')
  .option('-s, --save-production', 'tag auto ++ and save tag number')
  .parse(process.argv)

autoTag(commander)
