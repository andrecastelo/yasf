/**
 * Converts a string or array of notes into their sharp versions, removing
 * any flat notes.
 *
 * convertToSharp('A Bb C C# D Eb') -> ['A', 'A#', 'C', 'C#', 'D', 'D#']
 *
 * @param notes
 * @returns
 */
export const convertToSharp = (notes: string | string[]) => {
  const noteList = typeof notes === 'string' ? notes.split(' ') : [...notes];

  const noteMap = {
    Db: 'C#',
    Eb: 'D#',
    Gb: 'F#',
    Ab: 'G#',
    Bb: 'A#',
  };

  return noteList.map((note) =>
    note in noteMap ? noteMap[note as keyof typeof noteMap] : note
  );
};
