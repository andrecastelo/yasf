import { css } from '@emotion/react';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/AddRounded';
import RemoveIcon from '@mui/icons-material/RemoveRounded';
import { NoteType, chromaticScale } from '@/lib/semitones';

import { Note } from './Note';

const NoteButton = styled.button`
  background-color: var(--slate-900);
  color: var(--slate-300);
  width: 32px;
  height: 32px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;

  &:hover {
    background-color: var(--slate-800);
    color: var(--slate-200);
  }
`;

const RootNoteWrapper = styled.div`
  border-right: 4px solid var(--slate-50);
  display: flex;
  padding-left: 8px;
  padding-right: 8px;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

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
    <RootNoteWrapper>
      <NoteButton>
        <RemoveIcon />
      </NoteButton>
      <Note note={root} />
      <NoteButton>
        <AddIcon />
      </NoteButton>
    </RootNoteWrapper>
    {chromaticScale(root)
      .slice(1)
      .map((note, index) => (
        <Note note={note} key={`${root}__${note}__${index}`} />
      ))}
  </div>
);
