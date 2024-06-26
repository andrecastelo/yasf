import { test, expect } from 'vitest';
import {
  notesToSemitones,
  semitonesToIntervals,
  notesToPotentialSemitones,
  NoteType,
  chromaticScale,
  addNote,
} from './semitones';

test('lib/notesToSemitones', () => {
  expect(notesToSemitones('C')).toEqual(notesToSemitones(['C']));
  expect(notesToSemitones('C')).toEqual([0]);
  expect(notesToSemitones('A A#')).toEqual([0, 1]);
  expect(notesToSemitones('A B C D E F G')).toEqual([0, 2, 3, 5, 7, 8, 10]);
  expect(notesToSemitones('B C D E F G A')).toEqual([0, 1, 3, 5, 6, 8, 10]);
  expect(notesToSemitones('C D E F G A B')).toEqual([0, 2, 4, 5, 7, 9, 11]);
  expect(notesToSemitones('D E F G A B C')).toEqual([0, 2, 3, 5, 7, 9, 10]);
  expect(notesToSemitones('E F G A B C D')).toEqual([0, 1, 3, 5, 7, 8, 10]);
  expect(notesToSemitones('F G A B C D E')).toEqual([0, 2, 4, 6, 7, 9, 11]);
  expect(notesToSemitones('G A B C D E F')).toEqual([0, 2, 4, 5, 7, 9, 10]);
});

test('lib/semitonesToIntervals', () => {
  expect(
    semitonesToIntervals([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]),
  ).toEqual('1P 2m 2M 3m 3M 4P 4A 5P 6m 6M 7m 7M');
});

test('lib/notesToPotentialIntervals', () => {
  expect(notesToPotentialSemitones('A A#')).toEqual(['1P 2m', '1P 7M']);
  expect(notesToPotentialSemitones('A C D F G')).toEqual([
    '1P 3m 4P 6m 7m',
    '1P 2M 4P 5P 6M',
    '1P 3m 4P 5P 7m',
    '1P 2M 3M 5P 6M',
    '1P 2M 4P 5P 7m',
  ]);
});

test('lib/chromaticScale', () => {
  const guitarStrings: NoteType[][] = [
    ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
    ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
    ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
    ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
    ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
  ];

  expect(chromaticScale('E')).toEqual(guitarStrings[0]);
  expect(chromaticScale('A')).toEqual(guitarStrings[1]);
  expect(chromaticScale('D')).toEqual(guitarStrings[2]);
  expect(chromaticScale('G')).toEqual(guitarStrings[3]);
  expect(chromaticScale('B')).toEqual(guitarStrings[4]);
});

test('lib/addNote', () => {
  expect(addNote('C', 1)).toEqual('C#');
  expect(addNote('B', 1)).toEqual('C');
  expect(addNote('C', -1)).toEqual('B');

  expect(addNote('C', 13)).toEqual('C#');
  expect(addNote('C', 25)).toEqual('C#');
  expect(addNote('C', -13)).toEqual('B');
  expect(addNote('C', -25)).toEqual('B');
});
