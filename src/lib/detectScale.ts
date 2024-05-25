import { detect } from '@tonaljs/scale';

import { NoteType } from './semitones';

export const detectScale = (notes: NoteType[], tonic?: NoteType): string[] => {
  const uniqueNotes = Array.from(new Set(notes));

  if (tonic) {
    return detect(uniqueNotes, { tonic });
  } else {
    return notes.map(note => detect(uniqueNotes, { tonic: note })).flat();
  }
};
