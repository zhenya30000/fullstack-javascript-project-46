# Gendiff Hexlet lvl2 study project

### Hexlet tests and linter status:
[![Actions Status](https://github.com/zhenya30000/fullstack-javascript-project-46/workflows/hexlet-check/badge.svg)](https://github.com/zhenya30000/fullstack-javascript-project-46/actions)
[![.github/workflows/CI-tests.yml](https://github.com/zhenya30000/fullstack-javascript-project-46/actions/workflows/CI-tests.yml/badge.svg)](https://github.com/zhenya30000/fullstack-javascript-project-46/actions/workflows/CI-tests.yml)
<a href="https://codeclimate.com/github/zhenya30000/fullstack-javascript-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/efb541b8faa9a6d27aab/maintainability" /></a>
<a href="https://codeclimate.com/github/zhenya30000/fullstack-javascript-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/efb541b8faa9a6d27aab/test_coverage" /></a>

## Installation

To install clone the project in the desired folder
```sh
git clone git@github.com:zhenya30000/fullstack-javascript-project-46.git
```

And use npm ci
```sh
npm ci
```
Or Makefile command 
```sh
make install
```
To use CLI, link the project in the system
```sh
sudo npm link
```
or 
```sh
make link
```
## Usage 
Use relative or full paths to compare config files

Example:
```sh
gendiff file1.json file2.json
```
or 
```sh
gendiff /home/username/projectname/__fixtures__/file1.json /home/username/projectname/__fixtures__/file2.json
```
### Options

Three output formats availiable in the application. 

- stylish
- plain
- json

The default format is 'stylish'.

Use comand line option to switch them.

```sh
'-f, --format <type>'
```

Examples of usage

```sh
gendiff -f plain file1.json file2.json 

gendiff -f json file1.json file2.json 
```

## Exmaples of usage

Difference between flat JSON files:

<a href="https://asciinema.org/a/pJ9zQKBFQCHPk0b8FivcCQLGq" target="_blank"><img src="https://asciinema.org/a/pJ9zQKBFQCHPk0b8FivcCQLGq.svg" /></a>

Compare YML files:

<a href="https://asciinema.org/a/zNDQP6yOskWYWRqU388dOo4Qq" target="_blank"><img src="https://asciinema.org/a/zNDQP6yOskWYWRqU388dOo4Qq.svg" /></a>

Compare nested config files:

<a href="https://asciinema.org/a/MDspwdc2y3l5lph8K7VqZDtLh" target="_blank"><img src="https://asciinema.org/a/MDspwdc2y3l5lph8K7VqZDtLh.svg" /></a>

Plain output functionality:

<a href="https://asciinema.org/a/AIFpRtZX7Ql8bV5APrMMVhF32" target="_blank"><img src="https://asciinema.org/a/AIFpRtZX7Ql8bV5APrMMVhF32.svg" /></a>

JSON output functionality:

<a href="https://asciinema.org/a/PPl2rV4ibsfoviUvU9J3hmn1w" target="_blank"><img src="https://asciinema.org/a/PPl2rV4ibsfoviUvU9J3hmn1w.svg" /></a>