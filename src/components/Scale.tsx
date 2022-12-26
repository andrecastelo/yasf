import { useState } from 'react';
import { NoteType } from '../lib/semitones';
import { HighlightedContainer } from '../state/highlightedStateContainer';
import { SelectedContainer } from '../state/selectedStateContainer';
import { NotesString } from './NotesString';

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
  const [tuning, setTuning] = useState<string[]>([
    'E',
    'A',
    'D',
    'G',
    'B',
    'E',
  ]);

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
