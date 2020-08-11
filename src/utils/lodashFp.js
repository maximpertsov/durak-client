import chunk from 'lodash/fp/chunk';
import compact from 'lodash/fp/compact';
import drop from 'lodash/fp/drop';
import first from 'lodash/fp/first';
import flow from 'lodash/fp/flow';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import last from 'lodash/fp/last';
import map from 'lodash/fp/map';
import reverse from 'lodash/fp/reverse';
import size from 'lodash/fp/size';
import take from 'lodash/fp/take';
import unzip from 'lodash/fp/unzip';
import zipObject from 'lodash/fp/zipObject';

const fp = Object.freeze({
  chunk,
  compact,
  drop,
  flow,
  reverse,
  map,
  take,
  first,
  isEmpty,
  isEqual,
  size,
  last,
  zipObject,
  unzip,
});

export default fp;
