export const permutations = <T>(array: T[]): T[][] => {
  const result: T[][] = [];
  const dummy: T[] = [...array];

  for (let index = 0; index < array.length; index++) {
    result.push([...dummy]);
    dummy.push(dummy.shift() as T);
  }

  return result;
};

export const wrapAround = <T>(array: T[], index: number) => {
  const slice = array.slice(index);

  return slice.concat(array.slice(0, slice.length - 1));
};
