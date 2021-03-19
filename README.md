# merge-packages

Very intelligently merge `package.json` files. 2021 UP_TO_DATE VERSION OF THIS TOOL.

[![NPM](https://nodei.co/npm/merge-packages.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/merge-packages/)
[![npm package](https://img.shields.io/npm/v/merge-packages.svg)](https://www.npmjs.org/package/merge-packages)
[![npm download](https://img.shields.io/npm/dt/merge-packages.svg)](https://www.npmjs.org/package/merge-packages)
[![github license](https://img.shields.io/github/license/zppack/merge-packages.svg)](https://github.com/zppack/merge-packages/blob/master/LICENSE)
[![Dependency Status](https://david-dm.org/zppack/merge-packages.svg)](https://david-dm.org/zppack/merge-packages)
[![devDependency Status](https://david-dm.org/zppack/merge-packages/dev-status.svg)](https://david-dm.org/zppack/merge-packages#info=devDependencies)
![github language top](https://img.shields.io/github/languages/top/zppack/merge-packages.svg)
[![github stars](https://img.shields.io/github/stars/zppack/merge-packages.svg?style=social&label=Stars)](https://github.com/zppack/merge-packages)  

## Features

- [x] merge `dependencies/devDependencies/peerDependencies` with semver rules respected
- [x] merge `bin` field intelligently
- [x] combine `description` field's value
- [x] retain some fields of the first `package.json`
- [x] sort the merged `package.json` fields
- [ ] provide cli tools

## Start

### Install

```sh
npm install --save merge-packages

# or with yarn
yarn add merge-packages

```

### Usage

- Merge two `package.json` files

```javascript
import fs from 'fs';
import mergePackages from 'merge-package';

const pkgStr1 = fs.readFileSync('./a/package.json', 'utf8');
const pkgStr2 = fs.readFileSync('./b/package.json', 'utf8');

// only support string. buffer is not supported
const mergedPkgStr = mergePackages(pkgStr1, pkgStr2);
fs.writeFileSync('./package.json', mergedPkgStr);
```

- Merge two `package.json` objects

```javascript
import { mergeJson } from 'merge-package';

const pkg1 = {
    name: 'my-package',
    bin: {
        'my-test': 'bin/my-test.js'
    },
    dependencies: {
        'merge-packages': '0.1.0',
        '@babel/core': '^7.13.10'
    }
};

const pkg2 = {
    name: 'my-cli',
    bin: 'bin/cli.js',
    devDependencies: {
        'rimraf': '^3.0.2'
    },
    dependencies: {
        '@babel/core': '^7.13.0'
    }
};

const mergedPkg = mergeJson(pkg1, pkg2);
console.log(mergedPkg);

```

## Contributing

[How to contribute to this?](CONTRIBUTING.md)

## Recently changes

See the [change log](CHANGELOG.md).

## License

[MIT](LICENSE)
