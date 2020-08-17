import _camelCase from 'lodash/camelCase';
import chunk from 'lodash/chunk';
import compact from 'lodash/compact';
import drop from 'lodash/drop';
import first from 'lodash/first';
import fromPairs from 'lodash/fromPairs';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import isPlainObject from 'lodash/isPlainObject';
import last from 'lodash/last';
import map from 'lodash/map';
import reverse from 'lodash/reverse';
import size from 'lodash/size';
import snakeCase from 'lodash/snakeCase';
import take from 'lodash/take';
import takeRight from 'lodash/takeRight';
import toPairs from 'lodash/toPairs';
import unzip from 'lodash/unzip';
import zipObject from 'lodash/zipObject';

const camelCase = string =>
  // Lodash's camel-casing function is too aggressive.
  // For example, it transforms move keys such as 'a1a2'
  // into 'a1A2'. This function makes sure that camel-casing
  // is only performed on strings that include an underscore
  // character.
  (string.includes('_') ? _camelCase(string) : string);

// TODO: implement a way to not recursively camelcase certain objects
const deepKeyTransform = (fn, obj) => {
  if (isPlainObject(obj)) {
    const pairs = toPairs(obj).map(([key, value]) => [
      fn(key),
      deepKeyTransform(fn, value),
    ]);
    return fromPairs(pairs);
  }
  if (isArray(obj)) {
    return obj.map(o => deepKeyTransform(fn, o));
  }
  return obj;
};

export const deepCamelCase = data => deepKeyTransform(camelCase, data);
export const deepSnakeCase = data => deepKeyTransform(snakeCase, data);

const _ = Object.freeze({
  chunk,
  compact,
  drop,
  first,
  isEmpty,
  isEqual,
  last,
  map,
  reverse,
  size,
  take,
  takeRight,
  zipObject,
  unzip,
});

export default _;
