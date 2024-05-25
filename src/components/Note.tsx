import clsx from 'clsx';

import { NoteType } from '@/lib/semitones';

import { useScaleState } from './ScaleStateProvider';

type NoteProps = {
  note: NoteType;
};

export const Note = ({ note }: NoteProps) => {
  const { isSelected, selectNote, deselectNote, isHighlighted } =
    useScaleState();

  const selected = isSelected(note);
  const highlighted = isHighlighted(note);

  const style = clsx(
    'w-8 h-8',
    'flex justify-center items-center',
    'text-sm p-2 rounded-full transition-colors',
    'cursor-pointer select-none border',
    {
      'text-slate-600': selected,
      'text-slate-300': highlighted && !selected,
      'text-slate-400': !highlighted && !selected,
      'border-slate-600': selected,
      'border-slate-500': highlighted && !selected,
      'border-transparent': !highlighted && !selected,
      'bg-slate-100': selected,
      'bg-slate-600': highlighted && !selected,
      'bg-transparent': !highlighted && !selected,
      'border-dashed': highlighted && !selected,
      'border-solid': selected,
    },
  );

  const onClick = () => {
    if (!selected) {
      selectNote(note);
    } else {
      deselectNote(note);
    }
  };

  return (
    <div onClick={onClick} className={style}>
      <span className="inline-block justify">{note}</span>
    </div>
  );
};
