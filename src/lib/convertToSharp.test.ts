import { test, expect } from 'vitest';
import { convertToSharp } from './convertToSharp';

test('lib/convertToSharp', () => {
  // prettier-ignore
  expect(convertToSharp('C Db D Eb E F Gb G Ab A Bb B C')).toEqual([
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C',
  ]);
});
