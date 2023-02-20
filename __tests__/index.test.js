import fs from 'fs';
import gendiff from '../src/index.js';

const stylish = fs.readFileSync('./__fixtures__/stylish', 'utf-8');
const plain = fs.readFileSync('./__fixtures__/plain', 'utf-8');
const json = fs.readFileSync('./__fixtures__/json', 'utf-8');
const extensions = ['yaml', 'yml', 'json'];

test.each(extensions)('Stylish output with %s configs', (ext) => {
  expect(
    gendiff(`./__fixtures__/file1.${ext}`, `./__fixtures__/file2.${ext}`),
  ).toEqual(stylish);
});

test.each(extensions)('Plain output with %s configs', (ext) => {
  expect(
    gendiff(`./__fixtures__/file1.${ext}`, `./__fixtures__/file2.${ext}`, 'plain'),
  ).toEqual(plain);
});

test.each(extensions)('JSON output with %s configs', (ext) => {
  expect(
    gendiff(`./__fixtures__/file1.${ext}`, `./__fixtures__/file2.${ext}`, 'json'),
  ).toEqual(json);
});
