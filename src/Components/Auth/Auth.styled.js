import styled from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Button = styled.button`
  cursor: pointer;
  display: flex;
  width: 194px;
  padding: 16px 32px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 0;
  border-radius: 32px;
  background: var(--primary-pink);
  color: var(--White, #fff);
  text-align: center;
  font-family: Montserrat, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;

  &:hover {
    background: var(--primary-purple);
  }
`;
