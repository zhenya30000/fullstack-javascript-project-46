import yaml from 'js-yaml';

const parseFile = (data, fileType) => {
  switch (fileType) {
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    case '.json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown file type: ${fileType}`);
  }
};

export default parseFile;
