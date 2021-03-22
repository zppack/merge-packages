#!/usr/bin/env node

import program from 'commander';
import glob from 'glob';
import path from 'path';
import fse from 'fs-extra';
import merge from '.';
import pkg from  '../package.json';

const argsHelpText = `The package.json files or directories to merge.
When passing a directory, a minimatch expression \`package*(.*).json\` -
- will be used to match files except \`package.merged.json\`.
If no arguments passed, the result will be like passing a directory \`./\` .
`;

program.version(pkg.version, '-v, --version')
  .option('-o, --output <dest>', 'merged package.json file path', 'package.merged.json')
  .arguments('[pkgs...]', 'package.json files or paths to merge.')
  .description('', { 'pkgs': argsHelpText })
  .action((pkgs, opts) => {
    const pkgFiles = pkgs.length ? validateArguments(pkgs) : glob.sync('package*(.*).json', { dot: true, cwd: path.resolve('./'), ignore: 'package.merged.json', nodir: true, realpath: true });
    const mergedPkgStr = mergeAllPackages(pkgFiles);
    const destFile = outputMergedPackage(mergedPkgStr, opts.output);
    console.log(`Successfully merged packages. Result file: "${destFile}".`);
  });

program.parse(process.argv);

function validateArguments(pkgs) {
  return pkgs.reduce((res, pkg) => {

    if (fse.existsSync(pkg)) {
      const stat = fse.lstatSync(pkg);
      if (stat.isFile()) {
        return res.concat(pkg);
      } else if (stat.isDirectory(pkg)) {
        return res.concat(glob.sync('package*(.*).json', { dot: true, cwd: path.resolve(pkg), ignore: 'package.merged.json', nodir: true, realpath: true }));
      } else {
        console.warn(`WARN: "${pkg}" is not a file or a path.`);
        return res;
      }
    } else {
      console.warn(`WARN: the file or path "${pkg}" was not exist.`);
      return res;
    }
  }, []);
}

function mergeAllPackages(files) {
  return files.reduce((res, file) => {
    const fileStr = fse.readFileSync(file, 'utf8');
    if (!res) {
      return fileStr;
    }
    return merge(res, fileStr);
  }, '');
}

function outputMergedPackage(str, dest) {
  if (dest === 'package.merged.json') {
    let i = 1;
    while (fse.existsSync(dest)) {
      dest = `package.merged${i}.json`;
      i += 1;
    }
  }
  fse.writeFileSync(dest, str);
  return dest;
}
