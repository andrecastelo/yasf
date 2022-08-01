/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { chromaticScale, NoteType } from '../lib/semitones';

type NoteProps = {
  note: NoteType;
};

const Note = ({ note }: NoteProps) => (
  <div
    css={() => css`
      border: 1px solid black;
      background-color: var(--slate-50);
      color: var(--slate-600);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border-radius: 50%;
      width: 24px;
      height: 24px;
    `}
  >
    {note}
  </div>
);

type NotesStringProps = {
  root: NoteType;
};

const NotesString = ({ root }: NotesStringProps) => (
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
    {chromaticScale(root).map((note) => (
      <Note note={note} />
    ))}
  </div>
);

export const Scale = () => {
  return (
    <div>
      <NotesString root={'E'} />
      <NotesString root={'B'} />
      <NotesString root={'G'} />
      <NotesString root={'D'} />
      <NotesString root={'A'} />
      <NotesString root={'E'} />
    </div>
  );
};
