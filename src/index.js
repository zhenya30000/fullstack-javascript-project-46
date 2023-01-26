import getChanges from './getChanges.js';
import parseFile from './parseFile.js';
import stylish from './stylish.js';

const gendiff = (file1, file2) => {
  const before = parseFile(file1);
  const after = parseFile(file2);
  const changes = getChanges(before, after);
  return stylish(changes);
};

export default gendiff;
