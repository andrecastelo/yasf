import { test, expect, assert, describe, it } from 'vitest';
import { SHARP_NOTES_ONLY } from './semitones';
import { permutations, wrapAround } from './utils';

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

test('lib/utils/wrapAround', () => {
  const notes = 'cdefgab'.toUpperCase().split('');

  it('has the same length', () => {
    expect(wrapAround(notes, 0).length).toEqual(notes.length);
    expect(wrapAround(notes, 1).length).toEqual(notes.length);
    expect(wrapAround(notes, 2).length).toEqual(notes.length);
    expect(wrapAround(notes, 3).length).toEqual(notes.length);
    expect(wrapAround(notes, 4).length).toEqual(notes.length);
    expect(wrapAround(notes, 5).length).toEqual(notes.length);
    expect(wrapAround(notes, 6).length).toEqual(notes.length);
  });

  expect(wrapAround(notes, 0)).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
  expect(wrapAround(notes, 1)).toEqual(['D', 'E', 'F', 'G', 'A', 'B', 'C']);
  expect(wrapAround(notes, 2)).toEqual(['E', 'F', 'G', 'A', 'B', 'C', 'D']);
  expect(wrapAround(notes, 3)).toEqual(['F', 'G', 'A', 'B', 'C', 'D', 'E']);
  expect(wrapAround(notes, 4)).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F']);
  expect(wrapAround(notes, 5)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
  expect(wrapAround(notes, 6)).toEqual(['B', 'C', 'D', 'E', 'F', 'G', 'A']);
});
