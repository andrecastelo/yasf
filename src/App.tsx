/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
    <div className="App" css={cssVars}>
      <Scale />
    </div>
  );
};
