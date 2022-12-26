import styled from '@emotion/styled';

export const Input = styled.input`
  padding: 4px;
  border: 1px solid var(--gray-600);
  background-color: var(--gray-900);
  color: var(--gray-300);
  border-radius: 8px;
  outline: 0;
  transition: border-color 0.2s linear;

  &:focus {
    border-color: var(--gray-400);
  }
`;
