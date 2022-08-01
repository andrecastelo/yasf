export const permutations = <T>(array: T[]): T[][] => {
  const result: T[][] = [];
  const dummy: T[] = [...array];

  for (let index = 0; index < array.length; index++) {
    result.push([...dummy]);
    dummy.push(dummy.shift() as T);
  }

  return result;
};
