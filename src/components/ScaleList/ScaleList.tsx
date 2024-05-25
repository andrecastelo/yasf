import clsx from 'clsx';

import { detectScale } from '@/lib/detectScale';
import { getScaleInfo } from '@/lib/getScaleInfo';

import { useScaleState } from '../ScaleStateProvider';

export const ScaleList = () => {
  const { selected, setHighlighted, setSelectedScale, selectedScale } = useScaleState();
  const scales = selected.length > 0 ? detectScale(selected) : [];

  if (!selected.length && !selectedScale) {
    return (
      <div className="w-full p-4">
        <p className="text-gray-100 text-center">
          Select some notes to see matching scales
        </p>
      </div>
    );
  }

  const setScale = (value: string) => {
    setSelectedScale(value);
    const notes = getScaleInfo(value);

    if (notes && notes.length) {
      setHighlighted(notes);
    }
  };

  return (
    <div>
      <p className="text-gray-100">Scales:</p>
      <ul>
        {scales.map(scale => (
          <li
            key={scale}
            className={clsx(
              'pl-4 cursor-pointer',
              scale === selectedScale && 'bg-slate-700 text-slate-100',
              scale !== selectedScale &&
              'hover:bg-slate-800 hover:text-slate-300 text-slate-200',
            )}
            onClick={() => setScale(scale)}
          >
            {scale}
          </li>
        ))}
      </ul>
    </div>
  );
};
