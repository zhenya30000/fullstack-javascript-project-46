import _ from 'lodash';

const gendiff = (file1, file2) => {
  let result = '{';

  const union = _.union(
    Object.entries(JSON.parse(file1)),
    Object.entries(JSON.parse(file2)),
  );

  const uniq = _.uniqWith(union, _.isEqual).sort();

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  for (const [key, value] of uniq) {
    
    if (obj1[key] === obj2[key]) {
      result += `\n    ${key}: ${value}`;
    }

    if (_.has(obj1, key) && obj1[key] !== obj2[key] && obj1[key] === value) {
      result += `\n  - ${key}: ${value}`;
    }
  }

  for (const [key, value] of uniq) {
    if (_.has(obj2, key) && obj1[key] !== obj2[key] && obj2[key] === value) {
      result += `\n  + ${key}: ${value}`;
    }
  }

  return `${result}\n}`;
};

export default gendiff;
