#!/usr/bin/env node

import clear from 'clear';
import { Command } from 'commander';
import { AlbumExtractor } from './commands';

const {
  env: { npm_package_name, npm_package_version, npm_package_description },
} = process;
const pkg = {
  name: `${npm_package_name}`,
  version: `${npm_package_version}`,
  description: `${npm_package_description}`,
};

clear();

const program = new Command();

program
  .name(pkg.name)
  .version(pkg.version)
  .description(pkg.description)
  .addCommand(AlbumExtractor)
  .parseAsync()
  .then(() => process.exit(0))
  .catch((reason) => console.error(reason));
  