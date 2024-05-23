import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useContainer } from 'unstated-next';
import { NoteType } from '../lib/semitones';
import { HighlightedContainer, SelectedContainer } from '../state';

type StyledNoteProps = {
  border: string;
  bgColor: string;
  color: string;
};

const StyledNote = styled.div<StyledNoteProps>`
  ${({ border, bgColor, color }) => css`
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
`;

const colors = {
  color: {
    selected: 'var(--slate-600)',
    highlighted: 'var(--slate-300)',
    default: 'var(--slate-400)',
  },
  border: {
    selected: '1px solid var(--slate-600)',
    highlighted: '1px dashed var(--slate-300)',
    default: '1px solid transparent',
  },
  bgColor: {
    selected: `var(--slate-100)`,
    highlighted: `var(--slate-600)`,
    default: 'transparent',
  },
};

const getColor = (
  colorName: keyof typeof colors,
  selected: boolean,
  highlighted: boolean,
) => {
  if (selected) {
    return colors[colorName].selected;
  } else if (highlighted) {
    return colors[colorName].highlighted;
  }

  return colors[colorName].default;
};

type NoteProps = {
  note: NoteType;
};

export const Note = ({ note }: NoteProps) => {
  const { isSelected, selectNote, deselectNote } =
    useContainer(SelectedContainer);
  const { isHighlighted } = useContainer(HighlightedContainer);

  const selected = isSelected(note);
  const highlighted = isHighlighted(note);

  const border = getColor('border', selected, highlighted);
  const bgColor = getColor('bgColor', selected, highlighted);
  const color = getColor('color', selected, highlighted);
  const onClick = () => {
    if (!selected) {
      selectNote(note);
    } else {
      deselectNote(note);
    }
  };

  return (
    <StyledNote
      onClick={onClick}
      border={border}
      bgColor={bgColor}
      color={color}
    >
      {note}
    </StyledNote>
  );
};
