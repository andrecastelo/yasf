import { NoteType } from '../lib/semitones';
import { createContainer } from 'unstated-next';
import { useState } from 'react';
import {
  deselectFromArray,
  isSelectedFromArray,
  selectFromArray,
} from '../lib/utils';

const useHighlightedNotes = (initialState: NoteType[] = []) => {
  const [highlightedNotes, setHighlightedNotes] =
    useState<NoteType[]>(initialState);

  return {
    highlightedNotes,
    setHighlightedNotes,
    highlightNote: selectFromArray<NoteType>(
      highlightedNotes,
      setHighlightedNotes
    ),
    unhighlightNote: deselectFromArray<NoteType>(
      highlightedNotes,
      setHighlightedNotes
    ),
    isHighlighted: isSelectedFromArray<NoteType>(highlightedNotes),
  };
};

export const HighlightedContainer = createContainer(useHighlightedNotes);
