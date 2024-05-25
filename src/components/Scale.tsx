import { ScaleStateProvider } from "./ScaleStateProvider";
import { NotesString } from './NotesString';

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
