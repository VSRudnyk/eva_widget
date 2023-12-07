import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: grid;
  grid-column: auto;
  gap: 4px;
  margin: 15px 0 15px;

  @media (min-width: 351px) and (max-width: 649px) {
    display: inline-grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
  }
  @media (min-width: 650px) {
    display: inline-grid;
    grid-template-columns: auto auto auto auto;
  }
`;

export const QuickMessageBtn = styled.button`
  display: flex;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: var(--primary-pink);
  border-radius: 100px;
  border: 1px solid var(--primary-pink);
`;
