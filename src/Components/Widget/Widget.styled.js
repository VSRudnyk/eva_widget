import styled from 'styled-components';

export const MainContainer = styled.main`
  padding: 16px;
  padding-top: 96px;
`;

export const ChatLog = styled.div`
  max-height: 300px;
  min-height: calc(70vh - 80px);
  overflow-y: scroll;

  @media (max-width: 360px) {
    min-height: calc(65vh - 80px);
  }
`;

export const InputContainer = styled.div`
  position: fixed;
  box-sizing: border-box;
  bottom: 15px;
  height: min-content;
  left: 16px;
  right: 16px;
`;
