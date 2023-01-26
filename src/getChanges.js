import _ from 'lodash';

const getChanges = (before, after) => {
  const iter = (before, after, depth) => {
    let result = [];
    const keys = _.union(Object.keys(before), Object.keys(after));
    keys.forEach((key) => {
      const beforeHasKey = _.has(before, key);
      const afterHasKey = _.has(after, key);
      const beforeIsObject = _.isObject(before[key]);
      const afterIsObject = _.isObject(after[key]);
      /* ____________ OBJECT __________ */
      if (beforeIsObject && afterIsObject) {
        result = result.concat({
          key,
          type: 'object',
          depth,
          children: iter(before[key], after[key], depth + 1),
        });
      }
      /* ____________ DELETED __________ */
      if (beforeHasKey && !afterHasKey) {
        result = result.concat({
          key,
          value: before[key],
          type: 'removed',
          depth,
        });
      }
      /* ____________ ADDED __________ */
      if (!beforeHasKey && afterHasKey) {
        result = result.concat({
          key,
          value: after[key],
          type: 'added',
          depth,
        });
      }
      /* ____________ COMMON KEY__________ */
      if (beforeHasKey && afterHasKey) {
        /* ____________ UNCHANGED __________ */
        if (before[key] === after[key]) {
          result = result.concat({
            key,
            value: before[key],
            type: 'unchanged',
            depth,
          });
        }
        /* ____________ CHANGED __________ */
        if (before[key] !== after[key] && !beforeIsObject && !afterIsObject) {
          result = result.concat({
            key,
            beforeValue: before[key],
            afterValue: after[key],
            type: 'changed',
            depth,
          });
        }
      }
    });
    return result;
  };
  return iter(before, after, 1);
};

export default getChanges;
