export const deepEqual = (object1: Object, object2: Object) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    // @ts-ignore
    const val1 = object1[key];
    // @ts-ignore
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
};

const isObject = (object: Object) => {
  return object != null && typeof object === 'object';
};
