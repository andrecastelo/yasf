import { NoteType } from '../lib/semitones';
import { createContainer } from 'unstated-next';
import { useState } from 'react';
import {
  deselectFromArray,
  isSelectedFromArray,
  selectFromArray,
} from '../lib/utils';

const useSelectedNotes = (initialState: NoteType[] = []) => {
  const [selectedNotes, setSelectedNotes] = useState<NoteType[]>(initialState);

  return {
    selectedNotes,
    setSelectedNotes,
    selectNote: selectFromArray<NoteType>(selectedNotes, setSelectedNotes),
    deselectNote: deselectFromArray<NoteType>(selectedNotes, setSelectedNotes),
    isSelected: isSelectedFromArray<NoteType>(selectedNotes),
  };
};

export const SelectedContainer = createContainer(useSelectedNotes);
