import { css } from '@emotion/react';
import { chromaticScale, NoteType } from '../lib/semitones';
import { HighlightedContainer } from './highlightedStateContainer';
import { SelectedContainer } from './selectedStateContainer';
import { Note } from './Note';

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
      .map((note, index) => (
        <Note note={note} key={`${root}__${note}__${index}`} />
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
