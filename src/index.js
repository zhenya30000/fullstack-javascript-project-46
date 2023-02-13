import path from 'path';
import { cwd } from 'process';
import fs from 'fs';
import buildAst from './buildAst.js';
import parseFile from './parseFile.js';
import stylish from './formatters/index.js';

const getExtension = (resolvedPath) => path.extname(resolvedPath);

const resolvePath = (filePath) => path.resolve(cwd(filePath), filePath);

const gendiff = (file1, file2, format) => {
  const beforePath = resolvePath(file1);
  const afterPath = resolvePath(file2);

  const beforeExt = getExtension(beforePath);
  const afterExt = getExtension(afterPath);

  const beforeParsedData = parseFile(
    fs.readFileSync(beforePath, 'utf-8'),
    beforeExt,
  );
  const afterParsedData = parseFile(
    fs.readFileSync(afterPath, 'utf-8'),
    afterExt,
  );
  const ast = buildAst(beforeParsedData, afterParsedData);
  return stylish(ast, format);
};

export default gendiff;

/* console.log(
  gendiff(
    './__fixtures__/recursiveFile1.json',
    './__fixtures__/recursiveFile2.json',
    'plainFormatter',
  ),
); */

/* console.log(
  gendiff(
    './__fixtures__/recursiveYaml.yml',
    './__fixtures__/recursiveYaml2.yml',
  ),
); */
