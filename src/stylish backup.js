import _ from 'lodash';

const indent = (depth) => '  '.repeat(depth);

const expandValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  let result = '{';
  keys.forEach((key) => {
    const expandedValue = expandValue(value[key], depth + 2);
    result += `\n${indent(depth + 2)}${key}: ${expandedValue}`;
  });
  result += `\n${indent(depth)}}`;
  return result;
};

const stylish = (astTree) => {
  console.log(JSON.stringify(astTree, null, ' '));

  const sortedTree = _.cloneDeep(astTree);
  for (let i = 0; i < sortedTree.length - 1; i += 1) {
    if (_.has(sortedTree[i], 'children')) {
      sortedTree[i].children.sort((a, b) => (a.key < b.key ? -1 : 0));
    }
  }
  /* 
  const expandValue = (value, indent) => {
  if (!_.isObject(value)) {
    return value;
  }

  
  const keys = Object.keys(value);
  return keys
    .map((key) => {
      if (_.isObject(value[key])) {
        return `{\n${' '.repeat(indent + 2)}${key}: ${expandValue(
          value[key],
          indent + 4,
        )}\n ${' '.repeat(indent)}}`;
      }
      return `{\n${' '.repeat(indent + 4)}  ${key}: ${value[key]}\n${' '.repeat(
        indent + 2,
      )}}`;
    })
    .join('\n');
};

const expandValue = (value, spacesCount) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object.keys(currentValue).map(
      (key) => `${currentIndent}${key}: ${iter(currentValue[key], depth + 1)}`,
    );
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, 1);
};

*/

  let level = 0;
  const iter = (currentItem) => {
    let result = '';
    currentItem.forEach((item) => {
      const { key, value, type, depth, children, beforeValue, afterValue } =
        item;
      level = depth;
      const expandedValue = expandValue(value, depth);
      switch (type) {
        case 'nested':
          result += `\n${indent(depth + 1)}${key}: ${iter(children)}`;
          break;
        case 'deleted':
          result += `\n${indent(depth)}- ${key}: ${expandedValue}`;
          break;
        case 'added':
          result += `\n${indent(depth)}+ ${key}: ${expandedValue}`;
          break;
        case 'unchanged':
          result += `\n${indent(depth)}  ${key}: ${expandedValue}`;
          break;
        case 'changed':
          result += `\n${indent(depth)}- ${key}: ${expandValue(
            beforeValue,
            depth,
          )}`;
          result += `\n${indent(depth)}+ ${key}: ${expandValue(
            afterValue,
            depth,
          )}`;
          break;
        default:
      }
    });
    return `${result}\n${indent(level - 1)}}`;
  };
  return `{\n${iter(sortedTree)}`;
};

export default stylish;