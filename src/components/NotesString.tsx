import { css } from '@emotion/react';
import { chromaticScale, NoteType } from '../lib/semitones';
import { Note } from './Note';

type NotesStringProps = {
  root: NoteType;
};

export const NotesString = ({ root }: NotesStringProps) => (
  <div
    css={css`
      display: grid;
      grid-template-columns: repeat(13, 1fr);
      gap: 8px;
      justify-items: center;
      margin-top: 8px;
      margin-bottom: 8px;
    `}
  >
    <div
      css={css`
        border-right: 4px solid var(--slate-50);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      `}
    >
      <Note note={root} />
    </div>
    {chromaticScale(root)
      .slice(1)
      .map((note, index) => (
        <Note note={note} key={`${root}__${note}__${index}`} />
      ))}
  </div>
);
