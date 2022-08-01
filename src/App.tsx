/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import { useMemo } from 'react';
import { Scale } from './components/Scale';
import { convertToVars } from './lib/utils';
import { colors } from './theme';

const getCssVariables = () => {
  return convertToVars(colors);
};

export const App = () => {
  const cssVars = useMemo(() => getCssVariables(), []);

  return (
    <div>
      <Global
        styles={{
          ':root': cssVars,
          body: {
            backgroundColor: 'var(--gray-50)',
            padding: 0,
            margin: 0,
          },
        }}
      />
      <Scale />
    </div>
  );
};
