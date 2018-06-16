'use strict';

const Funnel = require('broccoli-funnel');
const replace = require('broccoli-replace');
const mergeTrees = require('broccoli-merge-trees');
const path = require('path');

module.exports = {
  name: 'lodash',
  treeForAddon (tree) {
    const lodashPath = path.dirname(require.resolve('lodash-es/'));
    let lodashTree = this.treeGenerator(lodashPath);

    lodashTree = new Funnel(lodashTree, {
      include: [
        '**/*.js'
      ]
    });

    lodashTree = replace(lodashTree, {
      files: '**/*.js',
      patterns: [
        {
          match: /from '([^']+)\.js'/g,
          replacement: "from '$1'"
        }
      ]
    });

    if (!tree) {
      return this._super.treeForAddon.call(this, lodashTree);
    }

    const trees = mergeTrees([lodashTree, tree], {
      overwrite: true
    });

    return this._super.treeForAddon.call(this, trees);
  }
};
