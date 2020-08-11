import chunk from 'lodash/chunk';
import compact from 'lodash/compact';
import drop from 'lodash/drop';
import first from 'lodash/first';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import reverse from 'lodash/reverse';
import size from 'lodash/size';
import take from 'lodash/take';
import unzip from 'lodash/unzip';
import zipObject from 'lodash/zipObject';

const _ = Object.freeze({
  chunk,
  compact,
  drop,
  get,
  reverse,
  take,
  first,
  isEmpty,
  isEqual,
  size,
  last,
  zipObject,
  unzip,
});

export default _;