import { test, module } from 'qunit';
import isPlainObject from 'lodash/isPlainObject';

module('lodash-es export tests');

test('exports function', function(assert) {
  assert.equal(typeof isPlainObject, 'function');
});
