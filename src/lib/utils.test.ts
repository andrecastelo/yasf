import { test, expect, assert, describe, it } from 'vitest';
import { SHARP_NOTES_ONLY } from './semitones';
import {
  convertToVars,
  deselectFromArray,
  isSelectedFromArray,
  permutations,
  selectFromArray,
  wrapAround,
} from './utils';

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

test('lib/convertToVars', () => {
  const testColors = {
    black: '#000',
    rose: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
    },
  };

  expect(convertToVars(testColors)).toEqual({
    '--black': '#000',
    '--rose-50': '#fff1f2',
    '--rose-100': '#ffe4e6',
    '--rose-200': '#fecdd3',
    '--rose-300': '#fda4af',
    '--rose-400': '#fb7185',
    '--rose-500': '#f43f5e',
    '--rose-600': '#e11d48',
    '--rose-700': '#be123c',
    '--rose-800': '#9f1239',
    '--rose-900': '#881337',
  });
});

test('lib/selectFromArray', () => {
  const testArray = ['A', 'B', 'C'];
  const selectFn = selectFromArray(testArray);

  expect(selectFn).toBeTypeOf('function');
  expect(selectFn('D')).toEqual(['A', 'B', 'C', 'D']);
  expect(selectFn('C')).toEqual(['A', 'B', 'C']);
  expect(testArray).toEqual(['A', 'B', 'C']);
});

test('lib/deselectFromArray', () => {
  const testArray = ['A', 'B', 'C'];
  const deselectFn = deselectFromArray(testArray);

  expect(deselectFn).toBeTypeOf('function');
  expect(deselectFn('D')).toEqual(['A', 'B', 'C']);
  expect(deselectFn('B')).toEqual(['A', 'C']);
  expect(testArray).toEqual(['A', 'B', 'C']);
});

test('lib/isSelectedFromArray', () => {
  const testArray = ['A', 'B', 'C'];
  const isSelected = isSelectedFromArray(testArray);

  expect(isSelected).toBeTypeOf('function');
  expect(isSelected('A')).toBeTruthy();
  expect(isSelected('D')).toBeFalsy();
});
