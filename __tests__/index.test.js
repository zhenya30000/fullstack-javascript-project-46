import fs from 'fs';
import gendiff from '../index.js';

let fileData1;

beforeAll(() => {
  fileData1 = fs.readFileSync('./__fixtures__/file1.json', 'utf-8');
});

test('Function mainflow', () => {
  expect(
    gendiff(
      fs.readFileSync('./__fixtures__/file1.json', 'utf-8'),
      fs.readFileSync('./__fixtures__/file2.json', 'utf-8'),
    ),
  ).toEqual(
    '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}',
  );
});

test('Passes with both empty files', () => {
  expect(gendiff('{}', '{}')).toEqual('{\n}');
});

test('Passes with one of the files is empty', () => {
  expect(
    gendiff(
      fs.readFileSync('./__fixtures__/file2.json', 'utf-8'),
      fs.readFileSync('./__fixtures__/file3.json', 'utf-8'),
    ),
  ).toEqual('{\n  - host: hexlet.io\n  - timeout: 20\n  - verbose: true\n}');
});

test('Passes with keys equals values', () => {
  expect(
    gendiff(
      fs.readFileSync('./__fixtures__/file4.json', 'utf-8'),
      fs.readFileSync('./__fixtures__/file3.json', 'utf-8'),
    ),
  ).toEqual('{\n  - host: host\n  - timeout: timeout\n  - verbose: verbose\n}');
});

test('Passes if original data is immutable', () => {
  gendiff(
    fs.readFileSync('./__fixtures__/file1.json', 'utf-8'),
    fs.readFileSync('./__fixtures__/file2.json', 'utf-8'),
  );
  expect(fs.readFileSync('./__fixtures__/file1.json', 'utf-8')).toEqual(
    fileData1,
  );
});
