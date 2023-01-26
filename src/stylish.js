import _ from 'lodash';

const indent = (depth) => '  '.repeat(depth);

const expandObj = (node, depth) => {
  if (!_.isObject(node)) {
    return node;
  }
  const keys = Object.keys(node);
  let result = '';
  keys.forEach((key) => {
    if (_.isObject(node[key])) {
      result += `{\n${indent(depth)}${key}: ${expandObj(node[key], depth)}`;
    } else {
      result += `{\n${indent(depth + 2)}${key}: ${node[key]}\n${indent(depth + 1)}}`;
    }
  });
  return result;
};

const stylish = (astTree) => {
  const sortedTree = _.cloneDeep(astTree);
  for (let i = 0; i < sortedTree.length - 1; i += 1) {
    if (_.has(sortedTree[i], 'children')) {
      sortedTree[i].children.sort((a, b) => (a.key < b.key ? -1 : 0));
    }
  }
  let level = 0;
  const iter = (currentItem, acc) => {
    let result = acc;
    currentItem.forEach((item) => {
      const { key, value, type, depth, children, beforeValue, afterValue } =
        item;
      level = depth;
      const expandedValue = expandObj(value, depth);
      switch (type) {
        case 'object':
          result = result.concat(
            `\n${indent(depth + 1)}${key}: ${iter(children, '{')}`,
          );
          break;
        case 'removed':
          result += `\n${indent(depth)}- ${key}: ${expandedValue}`;
          break;
        case 'added':
          result += `\n${indent(depth)}+ ${key}: ${expandedValue}`;
          break;
        case 'unchanged':
          result += `\n${indent(depth)}${key}: ${expandedValue}`;
          break;
        case 'changed':
          result += `\n${indent(depth)}- ${key}: ${expandObj(
            beforeValue,
            depth,
          )}`;
          result += `\n${indent(depth)}+ ${key}: ${expandObj(
            afterValue,
            depth,
          )}`;
          break;
        default:
      }
    });
    return `${result}\n${indent(level - 1)}}____`;
  };
  return iter(sortedTree, '{');
};

export default stylish;
