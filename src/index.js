import path from 'path';
import { cwd } from 'process';
import fs from 'fs';
import getChanges from './getChanges.js';
import parseFile from './parseFile.js';
import stylish from './stylish.js';

const getExtension = (resolvedPath) => path.extname(resolvedPath);

const resolvePath = (filePath) => path.resolve(cwd(filePath), filePath);

const gendiff = (file1, file2) => {
  const beforePath = resolvePath(file1);
  const afterPath = resolvePath(file2);

  const beforeExt = getExtension(beforePath);
  const afterExt = getExtension(afterPath);

  const beforeParsedData = parseFile(fs.readFileSync(beforePath, 'utf-8'), beforeExt);
  const afterParsedData = parseFile(fs.readFileSync(afterPath, 'utf-8'), afterExt);

  const changes = getChanges(beforeParsedData, afterParsedData);
  return stylish(changes);
};

export default gendiff;

console.log(
  gendiff(
    './__fixtures__/recursiveFile1.json',
    './__fixtures__/recursiveFile2.json',
  ),
);
