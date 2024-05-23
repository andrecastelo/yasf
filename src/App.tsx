import { Global } from '@emotion/react';
import { useMemo } from 'react';
import { Scale } from './components/Scale';
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
            backgroundColor: 'var(--gray-700)',
            padding: 0,
            margin: 0,
          },
        }}
      />
      <Scale />
    </div>
  );
};
