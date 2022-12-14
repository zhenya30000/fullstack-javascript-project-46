import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import { cwd } from 'process';

const parseFile = (filePath) => {
  const resolvedPath = path.resolve(cwd(filePath), filePath);
  const fileType = path.extname(resolvedPath);
  switch (fileType) {
    case '.yml':
      return yaml.load(fs.readFileSync(resolvedPath, 'utf-8'));
    case '.yaml':
      return yaml.load(fs.readFileSync(resolvedPath, 'utf-8'));
    case '.json':
      return JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'));
    default:
      return console.error('Unknown file type');
  }
};

export default parseFile;
