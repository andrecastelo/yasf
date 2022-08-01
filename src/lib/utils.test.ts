import { test, expect, assert, describe } from 'vitest';
import { permutations } from './utils';

test('lib/utils/permutations', () => {
  expect(permutations([0, 1])).toEqual([
    [0, 1],
    [1, 0],
  ]);

  expect(permutations([])).toEqual([]);
  expect(permutations(['a'])).toEqual([['a']]);
  expect(permutations('abc'.split(''))).toEqual([
    'abc'.split(''),
    'bca'.split(''),
    'cab'.split(''),
  ]);
});
