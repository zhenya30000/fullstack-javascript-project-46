import _ from 'lodash';

const buildAst = (before, after) => {
  const keys = [..._.union(Object.keys(before), Object.keys(after))].sort();

  return keys.map((key) => {
    const beforeHasKey = _.has(before, key);
    const afterHasKey = _.has(after, key);
    const beforeIsObject = _.isObject(before[key]);
    const afterIsObject = _.isObject(after[key]);

    if (beforeIsObject && afterIsObject) {
      return {
        type: 'nested',
        key,
        children: buildAst(before[key], after[key]),
      };
    }

    if (!beforeHasKey) {
      return {
        type: 'added',
        key,
        value: after[key],
      };
    }

    if (!afterHasKey) {
      return {
        type: 'deleted',
        key,
        value: before[key],
      };
    }

    if (_.isEqual(before[key], after[key])) {
      return {
        type: 'unchanged',
        key,
        value: after[key],
      };
    }
    return {
      type: 'changed',
      key,
      beforeValue: before[key],
      afterValue: after[key],
    };
  });
};

export default buildAst;
