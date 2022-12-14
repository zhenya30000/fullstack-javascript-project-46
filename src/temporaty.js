import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';

const lol = { key1: 'value1', key2: 'value2' };
const lol2 = lol;
const lol3 = { key1: 'value1', key2: 'value2' };
const lol4 = _.cloneDeep(lol);

console.log(JSON.stringify(lol4));

console.log(lol === lol2, lol === lol3, lol === lol4);

const readYaml = yaml.load(
  fs.readFileSync('./__fixtures__/file1.yml', 'utf-8'),
);

console.log(JSON.stringify(readYaml, null, ' '));
