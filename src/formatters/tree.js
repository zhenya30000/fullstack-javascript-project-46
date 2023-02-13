import _ from 'lodash';

const getIndent = (num) => '  '.repeat(num);

const stringify = (item, indentCount) => {
  if (!_.isObject(item)) {
    return item;
  }
  const keys = Object.keys(item);

  const result = keys.map((node) => {
    if (_.isObject(item[node])) {
      return `${getIndent(indentCount + 3)}${node}: ${stringify(
        item[node],
        indentCount + 2,
      )}`;
    }
    return `${getIndent(indentCount + 3)}${node}: ${item[node]}`;
  });
  return `{\n${result.join('\n')}\n${getIndent(indentCount + 1)}}`;
};

const buildDiff = (ast, indentCount = 1) => {
  const result = ast.flatMap((item) => {
    const {
      key, value, type, children, beforeValue, afterValue,
    } = item;
    switch (type) {
      case 'nested':
        return [
          `${getIndent(indentCount + 1)}${key}: {`,
          `${buildDiff(children, indentCount + 2)}\n${getIndent(
            indentCount + 1,
          )}}`,
        ];
      case 'added':
        return `${getIndent(indentCount)}+ ${key}: ${stringify(
          value,
          indentCount,
        )}`;
      case 'deleted':
        return `${getIndent(indentCount)}- ${key}: ${stringify(
          value,
          indentCount,
        )}`;
      case 'changed':
        return `${getIndent(indentCount)}- ${key}: ${stringify(
          beforeValue,
          indentCount,
        )}\n${getIndent(indentCount)}+ ${key}: ${stringify(
          afterValue,
          indentCount,
        )}`;
      case 'unchanged':
        return `${getIndent(indentCount + 1)}${key}: ${stringify(value)}`;
      default:
        return console.error('Unknown type');
    }
  });
  return result.join('\n');
};

const tree = (ast) => `{\n${buildDiff(ast)}\n}\n`;

export default tree;
