/* eslint-env node */
'use strict';

const mergeTrees = require('broccoli-merge-trees');
const path = require('path');

module.exports = {
  name: 'lodash',
  treeForAddon (tree) {
    const lodashPath = path.dirname(require.resolve('lodash-es/'));
    let lodashTree = this.treeGenerator(lodashPath);

    if (!tree) {
      return this._super.treeForAddon.call(this, lodashTree);
    }

    const trees = mergeTrees([lodashTree, tree], {
      overwrite: true
    });

    return this._super.treeForAddon.call(this, trees);
  }
};
