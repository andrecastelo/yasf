import { convertToSharp } from './convertToSharp';
import { permutations, wrapAround } from './utils';

// prettier-ignore
export const validNotes = [
  'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#',
  'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B',
] as const;

export type NoteType = (typeof validNotes)[number];

// prettier-ignore
export const SHARP_NOTES_ONLY = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
];

export const notesToSemitones = (rawScale: string | string[]) => {
  const notes = convertToSharp(rawScale);
  const baseIndex = SHARP_NOTES_ONLY.indexOf(notes[0]);
  const indexes = notes.map(note => {
    const noteIndex = SHARP_NOTES_ONLY.indexOf(note) - baseIndex;

    return noteIndex < 0 ? noteIndex + 12 : noteIndex;
  });

  return indexes;
};

export const semitonesToIntervals = (semitones: number[]): string => {
  // prettier-ignore
  const map = [
    '1P', '2m', '2M', '3m', '3M', '4P', '4A', '5P', '6m', '6M', '7m', '7M'
  ];

  return semitones
    .filter(x => x < 12)
    .sort((a, b) => a - b)
    .map(semitone => map[semitone])
    .join(' ');
};

export const notesToIntervals = (notes: string[] | string) => {
  return semitonesToIntervals(notesToSemitones(notes));
};

export const notesToPotentialSemitones = (rawNotes: string | string[]) => {
  const notes = convertToSharp(rawNotes);

  return permutations<string>(notes).map(notesToIntervals);
};

export const chromaticScale = (note: NoteType) => {
  const scale = wrapAround(
    SHARP_NOTES_ONLY,
    SHARP_NOTES_ONLY.indexOf(note as string),
  ) as NoteType[];

  scale.push(note);

  return scale;
};

export const addNote = (note: NoteType, _number: number = 1) => {
  const length = SHARP_NOTES_ONLY.length;
  const number = _number % length;
  const sharpNote = convertToSharp(note)[0];
  const noteIndex = SHARP_NOTES_ONLY.indexOf(sharpNote);
  let newIndex = noteIndex + number;

  if (newIndex > length - 1) {
    newIndex = newIndex - length;
  } else if (newIndex < 0) {
    newIndex = newIndex + length;
  }

  return SHARP_NOTES_ONLY[newIndex];
};
