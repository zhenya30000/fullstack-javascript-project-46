import fs from 'fs';
import gendiff from '../src/index.js';

let fileData1;

beforeAll(() => {
  fileData1 = fs.readFileSync('./__fixtures__/file1.json', 'utf-8');
});

test('hexlet JSON files', () => {
  expect(
    gendiff('./__fixtures__/hexlet/file1.json', './__fixtures__/hexlet/file2.json', 'tree'),
  ).toEqual(fs.readFileSync('./__fixtures__/hexlet/result_stylish.txt', 'utf-8'));
});

test('hexlet YML files', () => {
  expect(
    gendiff('./__fixtures__/hexlet/file1.yml', './__fixtures__/hexlet/file2.yml', 'tree'),
  ).toEqual(fs.readFileSync('./__fixtures__/hexlet/result_stylish.txt', 'utf-8'));
});

test('Recursive mainflow with JSON files', () => {
  expect(
    gendiff('./__fixtures__/recursiveFile1.json', './__fixtures__/recursiveFile2.json', 'tree'),
  ).toEqual(fs.readFileSync('./__fixtures__/recursiveDiff', 'utf-8'));
});

test('Recursive mainflow with YML files', () => {
  expect(
    gendiff('./__fixtures__/recursiveYaml.yml', './__fixtures__/recursiveYaml2.yml', 'tree'),
  ).toEqual(fs.readFileSync('./__fixtures__/recursiveDiff', 'utf-8'));
});

test('Plain output', () => {
  expect(
    gendiff('./__fixtures__/recursiveFile1.json', './__fixtures__/recursiveFile2.json', 'plain'),
  ).toEqual(fs.readFileSync('./__fixtures__/plainDiff', 'utf-8'));
});

test('JSON output', () => {
  expect(
    gendiff('./__fixtures__/recursiveFile1.json', './__fixtures__/recursiveFile2.json', 'json'),
  ).toEqual(fs.readFileSync('./__fixtures__/jsonDiff', 'utf-8'));
});

test('Function mainflow with JSON files', () => {
  expect(
    gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json'),
  ).toEqual(
    '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}\n',
  );
});

test('Function mainflow with YML files', () => {
  expect(
    gendiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml'),
  ).toEqual(
    '{\n  + mode: hexlet\n    name: github-actions\n    on: push\n  - test: true\n  + test: false\n}\n',
  );
});

test('Passes with empty files', () => {
  expect(
    gendiff('./__fixtures__/file3.json', './__fixtures__/file3.json'),
  ).toEqual('{\n\n}\n');
});

test('Passes with keys equals values', () => {
  expect(
    gendiff('./__fixtures__/file4.json', './__fixtures__/file3.json'),
  ).toEqual('{\n  - host: host\n  - timeout: timeout\n  - verbose: verbose\n}\n');
});

test('Passes if original data is immutable', () => {
  gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json');
  expect(fs.readFileSync('./__fixtures__/file1.json', 'utf-8')).toEqual(
    fileData1,
  );
});
