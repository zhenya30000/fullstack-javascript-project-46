import _ from 'lodash';

const replacer = '  ';

const stringify = (value, spacesCount) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  return Object.keys(value).reduce((acc, key) => {
    console.log('>>>', key, value[key]);
    console.log(_.isObject(value[key]));
    const indent = spacesCount + 2;
    if (_.isObject(value[key])) {
      return acc.concat(
        [
          `${replacer.repeat(indent)}  ${key}: ${stringify(
            value[key],
            indent,
          )}`,
        ].join('\n'),
      );
    }
    return acc.concat(
      [
        '{',
        `${replacer.repeat(indent)}  ${key}: ${value[key]}`,
        `${replacer.repeat(spacesCount + 1)}}`,
      ].join('\n'),
    );
  }, []);
};

const stylish = (ast, indentCount = 1) => {
  /*   console.log(JSON.stringify(ast, null, ' ')); */
  const x = ' ';
  return ast
    .map((node) => {
      const { key, value, type, children, beforeValue, afterValue } = node;
      const expandedValue = stringify(value, indentCount);
      switch (type) {
        case 'nested':
          return `${replacer.repeat(indentCount)}  ${key}: {\n${stylish(
            children,
            indentCount + 2,
          )}\n ${replacer.repeat(indentCount)} }`;
        case 'added':
          return `${replacer.repeat(indentCount)}+ ${key}: ${expandedValue}`;
        case 'deleted':
          return `${replacer.repeat(indentCount)}- ${key}: ${expandedValue}`;
        case 'unchanged':
          return `${replacer.repeat(indentCount)}  ${key}: ${expandedValue}`;
        case 'changed':
          return `${replacer.repeat(indentCount)}- ${key}: ${stringify(
            beforeValue,
            indentCount,
          )}\n${'  '.repeat(indentCount)}+ ${key}: ${stringify(
            afterValue,
            indentCount,
          )}`;
        default:
      }
    })
    .join('\n');
};

export default stylish;
