import tree from './tree.js';
import plain from './plain.js';
import json from './json.js';

export default (ast, type = 'tree') => {
  switch (type) {
    case 'tree':
      return tree(ast);
    case 'plain':
      return plain(ast);
    case 'json':
      return json(ast);
    default:
      return console.error('Unknown format type');
  }
};
