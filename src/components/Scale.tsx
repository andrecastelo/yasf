import styled from '@emotion/styled';
import { css } from '@emotion/react';

const String = () => (
  <div
    css={css`
      display: grid;
      grid-template-columns: repeat(1fr, 12);
      background-color: white;
    `}
  >
    <p>hello</p>
  </div>
);

export const Scale = () => {
  return (
    <div>
      <String />
    </div>
  );
};
