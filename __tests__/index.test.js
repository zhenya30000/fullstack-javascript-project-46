import fs from 'fs';
import gendiff from '../src/index.js';
import parseFile from '../src/parseFile.js';

let fileData1;

beforeAll(() => {
  fileData1 = fs.readFileSync('./__fixtures__/file1.json', 'utf-8');
});

/* test('JSON parser', () => {
  expect(typeof parseFile('./__fixtures__/file1.json')).toEqual('object');
});

test('YML parser', () => {
  expect(typeof parseFile('./__fixtures__/file1.yml')).toEqual('object');
});
 */
test('Recursive mainflow with JSON files', () => {
  expect(
    gendiff('./__fixtures__/recursiveFile1.json', './__fixtures__/recursiveFile2.json'),
  ).toEqual(fs.readFileSync('./__fixtures__/recursiveDiff', 'utf-8'));
});

/* test('Function mainflow with JSON files', () => {
  expect(
    gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json'),
  ).toEqual(
    '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}',
  );
});

test('Function mainflow with YML files', () => {
  expect(
    gendiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml'),
  ).toEqual(
    '{\n    name: github-actions\n    on: push\n  - test: true\n  + mode: hexlet\n  + test: false\n}',
  );
});

test('Passes with empty files', () => {
  expect(
    gendiff('./__fixtures__/file3.json', './__fixtures__/file3.json'),
  ).toEqual('{\n}');
});

test('Passes with keys equals values', () => {
  expect(
    gendiff('./__fixtures__/file4.json', './__fixtures__/file3.json'),
  ).toEqual('{\n  - host: host\n  - timeout: timeout\n  - verbose: verbose\n}');
});

test('Passes if original data is immutable', () => {
  gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json');
  expect(fs.readFileSync('./__fixtures__/file1.json', 'utf-8')).toEqual(
    fileData1,
  );
}); */
