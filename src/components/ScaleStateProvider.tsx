import { createContext, useContext, useReducer } from 'react';

import { NoteType } from '@/lib/semitones';

type Action =
  | { type: 'selectNote'; payload: NoteType }
  | { type: 'removeSelectedNote'; payload: NoteType }
  | { type: 'highlightNote'; payload: NoteType }
  | { type: 'removeHighlightedNote'; payload: NoteType }
  | { type: 'setHighlighted'; payload: NoteType[] | string[] }
  | { type: 'setSelected'; payload: NoteType[] | string[] }
  | { type: 'setScale'; payload: string };

type Dispatch = (action: Action) => void;

type ScaleContextState = {
  selectedScale: string;
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
    case 'setScale': {
      return {
        ...state,
        selectedScale: action.payload,
      };
    }

    case 'setHighlighted': {
      return {
        ...state,
        highlighted: action.payload as NoteType[],
      };
    }

    case 'setSelected': {
      return {
        ...state,
        selected: action.payload as NoteType[],
      };
    }

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
  initialScale: string;
  initialHighlighted?: NoteType[];
  initialSelected?: NoteType[];
};

const ScaleStateProvider = ({
  children,
  initialScale,
  initialSelected,
  initialHighlighted,
}: ScaleStateProviderProps) => {
  const [state, dispatch] = useReducer(scaleStateReducer, {
    selectedScale: initialScale,
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

  const { highlighted, selected, selectedScale } = state;

  return {
    highlighted,
    selected,
    selectedScale,

    setSelectedScale(payload: string) {
      dispatch({ type: 'setScale', payload });
    },

    setSelected(payload: NoteType[] | string[]) {
      dispatch({ type: 'setSelected', payload });
    },

    setHighlighted(payload: NoteType[] | string[]) {
      dispatch({ type: 'setHighlighted', payload });
    },

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
