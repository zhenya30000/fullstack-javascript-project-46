import _ from 'lodash';
import parseFile from './parseFile.js';

const gendiff = (file1, file2) => {
  let result = '{';
  const union = _.union(
    Object.entries(parseFile(file1)),
    Object.entries(parseFile(file2)),
  );

  const uniq = _.uniqWith(union, _.isEqual).sort();

  const obj1 = parseFile(file1);
  const obj2 = parseFile(file2);

  uniq.forEach(([key, value]) => {
    if (obj1[key] === obj2[key]) {
      result += `\n    ${key}: ${value}`;
    }

    if (_.has(obj1, key) && obj1[key] !== obj2[key] && obj1[key] === value) {
      result += `\n  - ${key}: ${value}`;
    }
  });

  uniq.forEach(([key, value]) => {
    if (_.has(obj2, key) && obj1[key] !== obj2[key] && obj2[key] === value) {
      result += `\n  + ${key}: ${value}`;
    }
  });

  return `${result}\n}`;
};

export default gendiff;
