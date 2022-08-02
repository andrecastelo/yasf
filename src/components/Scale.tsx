/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContainer } from 'unstated-next';
import { chromaticScale, NoteType } from '../lib/semitones';
import { HighlightedContainer } from './highlightedStateContainer';
import { SelectedContainer } from './selectedStateContainer';

type NoteProps = {
  note: NoteType;
};

const Note = ({ note }: NoteProps) => {
  const { isSelected, selectNote, deselectNote } =
    useContainer(SelectedContainer);
  const { isHighlighted } = useContainer(HighlightedContainer);

  const selected = isSelected(note);
  const highlighted = isHighlighted(note);

  const color = selected
    ? 'var(--slate-600)'
    : highlighted
    ? 'var(--slate-300)'
    : 'var(--slate-400)';

  const border = selected
    ? '1px solid var(--slate-600)'
    : highlighted
    ? '1px dashed var(--slate-300)'
    : '1px solid transparent';

  const bgColor = selected
    ? `var(--slate-100)`
    : highlighted
    ? `var(--slate-600)`
    : 'transparent';

  return (
    <div
      onClick={() => {
        if (!selected) {
          selectNote(note);
        } else {
          deselectNote(note);
        }
      }}
      css={() => css`
        border: ${border};
        background-color: ${bgColor};
        color: ${color};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        transition: background-color 0.2s ease-in;
        cursor: pointer;
      `}
    >
      {note}
    </div>
  );
};

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
      .map((note) => (
        <Note note={note} />
      ))}
  </div>
);

type ScaleStateProviderProps = {
  children: React.ReactNode;
  initialSelected?: NoteType[];
  initialHighlighted?: NoteType[];
};

export const ScaleStateProvider = ({
  children,
  initialHighlighted = [],
  initialSelected = [],
}: ScaleStateProviderProps) => (
  <SelectedContainer.Provider initialState={initialSelected}>
    <HighlightedContainer.Provider initialState={initialHighlighted}>
      {children}
    </HighlightedContainer.Provider>
  </SelectedContainer.Provider>
);

export const Scale = () => {
  return (
    <ScaleStateProvider initialHighlighted={['C', 'A', 'G', 'E', 'D']}>
      <div>
        <NotesString root={'E'} />
        <NotesString root={'B'} />
        <NotesString root={'G'} />
        <NotesString root={'D'} />
        <NotesString root={'A'} />
        <NotesString root={'E'} />
      </div>
    </ScaleStateProvider>
  );
};
