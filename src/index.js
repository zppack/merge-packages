import validRange from 'semver/ranges/valid';
import { intersect } from '@voxpelli/semver-set';
import jju from 'jju';
import R from 'ramda';
import { sortPackageJson } from 'sort-package-json';

const handlers = {
  description: appendString,
  main: replaceString,
  bin: mergeBin,
  repository: mergeRepository,
  dependencies: mergeDependencies,
  devDependencies: mergeDependencies,
  peerDependencies: mergeDependencies,
  engines: mergeDependencies,
};

function mergeString(prev = '', next = '') {
  return prev ? prev : next;
}

function replaceString(prev = '', next = '') {
  return next ? next : prev;
}

function appendString(prev = '', next = '') {
  if (prev && next) {
    return `${prev} ${next}`;
  } else {
    return prev || next;
  }
}

function mergeList(prev = [], next = []) {
  if (!Array.isArray(prev)) {
    prev = [prev];
  }
  if (!Array.isArray(next)) {
    next = [next];
  }
  return R.union(prev, next);
}

function mergeObject(prev = {}, next = {}) {
  return Object.assign({}, prev, next);
}

// The `bin` field is really special in package.json:
// Generally `bin` field has a value type of `Object`.
// But if the command name is the same as project name,
//     this field value can be shorted as a string which just indicates the command path.
// And two different command may have same command name,
//     in which case we should retain both command with two different command names.
function mergeBin(prev = {}, next = {}, prevPkg = {}, nextPkg = {}) {
  // transfer all `bin` field to object type
  if (typeof prev === 'string') {
    if (prevPkg.name) {
      prev = {
        [prevPkg.name]: prev
      };
    } else {
      // string typed `bin` need a package name, else it's discarded.
      prev = {};
    }
  }
  // do same process to next package `bin`
  if (typeof next === 'string') {
    if (nextPkg.name) {
      next = {
        [nextPkg.name]: next
      };
    } else {
      next = {};
    }
  }
  const res = Object.assign({}, prev);
  // merge two bins
  Object.keys(next).forEach((key) => {
    // retain same name command by rename `bin` key
    if (res[key]) {
      res[`${key}-${nextPkg.name || 0}`] = next[key];
    } else {
      res[key] = next[key];
    }
  });
  return res;
}

function mergeRepository(prev = '', next = {}) {
  return prev ? prev : next;
}

function mergeDependencies(prev = {}, next = {}) {
  if (R.isEmpty(prev)) {
    return next;
  }
  if (R.isEmpty(next)) {
    return prev;
  }

  return mergeObject(prev, R.mapObjIndexed((version, depName) => {
    // We need to check if both are indeed semver ranges in order to do intersects
    // – some may be git urls or other such things.
    var isSem = validRange(version) && validRange(prev[depName]);
    return isSem ? (intersect(version, prev[depName]) || version) : version;
  }, next));
}

export function mergeJson(prevPkg = {}, nextPkg = {}) {
  let finalPkg;
  if (R.isEmpty(prevPkg)) {
    finalPkg = { ...nextPkg };
  } else if (R.isEmpty(nextPkg)) {
    finalPkg = { ...prevPkg };
  } else {
    finalPkg = mergeObject(prevPkg, R.mapObjIndexed((nextVal, key) => {
      const prevVal = prevPkg[key];
      if (!prevVal) {
        return nextVal;
      }

      if (Reflect.has(handlers, key)) {
        return handlers[key](prevVal, nextVal, prevPkg, nextPkg);
      } else {
        const prevType = typeof prevVal;
        const nextType = typeof nextVal;
        // string array object
        if (Array.isArray(prevVal) || Array.isArray(nextVal)) {
          // anyone is array type
          return mergeList(prevVal, nextVal);
        } else if (prevType === 'string' && nextType === 'string') {
          // both are string types
          return mergeString(prevVal, nextVal);
        } else if (prevType === 'object' && nextType === 'object') {
          // both are object types
          return mergeObject(prevVal, nextVal);
        } else {
          console.warn(`Package Merge Warning: the field "${key}" in two packages are not the same type. (types: ${prevType},${nextType})`);
          return nextVal;
        }
      }
    }, nextPkg));
  }
  return sortPackageJson(finalPkg);
}

const jjuOpts = { mode: 'json' };

export default function mergeJsonStr(prevPkgStr, nextPkgStr) {
  return sortPackageJson(jju.update(prevPkgStr, mergeJson(jju.parse(prevPkgStr, jjuOpts), jju.parse(nextPkgStr, jjuOpts)), jjuOpts));
}
