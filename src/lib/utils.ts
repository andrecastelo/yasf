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

  return slice.concat(array.slice(0, array.length - slice.length));
};

type Palette = Record<number, string>;

type ColorObj = Record<string, Palette | string>;

type CSSVarsObject = Record<string, string>;

export const convertToVars = (
  colorObj: ColorObj | Palette,
  namespace = ''
): CSSVarsObject => {
  return Object.entries(colorObj).reduce((acc, [key, value]) => {
    if (typeof value === 'object') {
      return {
        ...acc,
        ...convertToVars(value, key),
      };
    }

    return {
      ...acc,
      [namespace ? `--${namespace}-${key}` : `--${key}`]: value,
    };
  }, {} as CSSVarsObject);
};
