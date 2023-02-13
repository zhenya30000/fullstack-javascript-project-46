import _ from 'lodash';

const stringify = (item) => {
  if (!_.isObject(item)) {
    if (typeof item === 'string') {
      return `'${item}'`;
    }
    return item;
  }
  return '[complex value]';
};

const buildDiff = (ast, pathLog = '') => {
  const result = ast.flatMap((item) => {
    const {
      key, value, type, children, beforeValue, afterValue,
    } = item;
    switch (type) {
      case 'nested':
        return buildDiff(children, `${pathLog.concat(key)}.`);
      case 'added':
        return `Property '${pathLog}${key}' was added with value: ${stringify(
          value,
        )}`;
      case 'deleted':
        return `Property '${pathLog}${key}' was removed`;
      case 'changed':
        return `Property '${pathLog}${key}' was updated. From ${stringify(
          beforeValue,
        )} to ${stringify(afterValue)}`;
      default:
        return null;
    }
  });
  return result.filter((line) => line !== null).join('\n');
};

const plain = (ast) => `${buildDiff(ast)}`;

export default plain;
