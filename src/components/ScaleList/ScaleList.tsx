import { useScaleState } from '../ScaleStateProvider';

export const ScaleList = () => {
  const { selected } = useScaleState();

  if (!selected.length) {
    return (
      <div className="w-full p-4">
        <p className="text-gray-100 text-center">
          Select some notes to see matching scales
        </p>
      </div>
    );
  }

  return <p className="text-gray-100">Scales:</p>;
};
