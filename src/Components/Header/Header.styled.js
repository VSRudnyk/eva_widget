import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  align-items: flex-start;
  align-self: stretch;
  background-image: var(--primary-gradient);
`;

export const HeaderTitle = styled.h1`
  font-family: 'Manrope', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.2;
  color: var(--neutral-white);
`;

export const HeaderSubtitle = styled.h2`
  font-family: 'Manrope', sans-serif;
  color: var(--neutral-white);
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  font-style: normal;
`;
