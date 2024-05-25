import { createContext, useContext, useReducer } from 'react';

import { NoteType } from '@/lib/semitones';

type Action =
  | { type: 'selectNote'; payload: NoteType }
  | { type: 'removeSelectedNote'; payload: NoteType }
  | { type: 'highlightNote'; payload: NoteType }
  | { type: 'removeHighlightedNote'; payload: NoteType };

type Dispatch = (action: Action) => void;

type ScaleContextState = {
  highlighted: NoteType[];
  selected: NoteType[];
};

const ScaleContext = createContext<
  | {
    state: ScaleContextState;
    dispatch: Dispatch;
  }
  | undefined
>(undefined);

const scaleStateReducer = (state: ScaleContextState, action: Action) => {
  switch (action.type) {
    case 'highlightNote': {
      return {
        ...state,
        highlighted: Array.from(
          new Set([...state.highlighted, action.payload]),
        ).sort(),
      };
    }

    case 'removeHighlightedNote': {
      return {
        ...state,
        highlighted: state.highlighted.filter(note => note !== action.payload),
      };
    }

    case 'selectNote': {
      return {
        ...state,
        selected: Array.from(
          new Set([...state.selected, action.payload]),
        ).sort(),
      };
    }

    case 'removeSelectedNote': {
      return {
        ...state,
        selected: state.selected.filter(note => note !== action.payload),
      };
    }
    default: {
      const actionType = (action as { type: string }).type;
      throw new Error(`Scale State action not found: ${actionType}`);
    }
  }
};

type ScaleStateProviderProps = {
  children: React.ReactNode;
  initialHighlighted?: NoteType[];
  initialSelected?: NoteType[];
};

const ScaleStateProvider = ({
  children,
  initialSelected,
  initialHighlighted,
}: ScaleStateProviderProps) => {
  const [state, dispatch] = useReducer(scaleStateReducer, {
    selected: initialSelected || [],
    highlighted: initialHighlighted || [],
  });

  const value = { state, dispatch };

  return (
    <ScaleContext.Provider value={value}>{children}</ScaleContext.Provider>
  );
};

const useScaleState = () => {
  const context = useContext(ScaleContext);
  if (!context) {
    throw new Error('useScaleState must be used within ScaleStateProvider');
  }

  const { state, dispatch } = context;

  const { highlighted, selected } = state;

  return {
    highlighted,
    selected,
    isSelected(note: NoteType) {
      return selected.indexOf(note) >= 0;
    },

    isHighlighted(note: NoteType) {
      return highlighted.indexOf(note) >= 0;
    },

    selectNote(payload: NoteType) {
      dispatch({ type: 'selectNote', payload });
    },

    deselectNote(payload: NoteType) {
      dispatch({ type: 'removeSelectedNote', payload });
    },

    highlightNote(payload: NoteType) {
      dispatch({ type: 'highlightNote', payload });
    },

    unhighlightNote(payload: NoteType) {
      dispatch({ type: 'removeHighlightedNote', payload });
    },
  };
};

export { ScaleStateProvider, useScaleState };
