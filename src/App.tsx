import { useMemo } from 'react';

import { Global } from '@emotion/react';

import { Fretboard } from './components';
import { ScaleStateProvider } from './components/ScaleStateProvider';
import { convertToVars } from './lib/utils';
import { colors } from './theme';

const getCssVariables = () => convertToVars(colors);

export const App = () => {
  const cssVars = useMemo(() => getCssVariables(), []);

  return (
    <div>
      <Global
        styles={{
          ':root': cssVars,
          body: {
            backgroundColor: 'var(--gray-900)',
            padding: 0,
            margin: 0,
          },
        }}
      />
      <ScaleStateProvider>
        <Fretboard />
      </ScaleStateProvider>
    </div>
  );
};
