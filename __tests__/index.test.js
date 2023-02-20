import fs from 'fs';
import gendiff from '../src/index.js';

const extensions = ['yaml', 'yml', 'json'];
const formats = ['stylish', 'plain', 'json'];
const getResult = (ext, type) => gendiff(`./__fixtures__/file1.${ext}`, `./__fixtures__/file2.${ext}`, type);
const getExpected = (type) => fs.readFileSync(`./__fixtures__/${type}`, 'utf-8');

formats.forEach((format) => {
  test.each(extensions)(`${format} output with %s configs`, (ext) => {
    expect(getResult(ext, format)).toEqual(getExpected(format));
  });
});
