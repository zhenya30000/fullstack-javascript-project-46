import tree from './tree.js';
import plain from './plain.js';

const formatterType = {
  tree,
  plain,
};

export default (ast, type = 'tree') => formatterType[type](ast);
