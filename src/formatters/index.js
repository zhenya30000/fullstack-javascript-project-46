import tree from './tree.js';
import plain from './plain.js';
import json from './json.js';

const formatterType = {
  tree,
  plain,
  json,
};

export default (ast, type = 'tree') => formatterType[type](ast);
