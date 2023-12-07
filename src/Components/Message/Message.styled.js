import styled from 'styled-components';

export const MessageBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  flex-direction: row;
`;

export const MessageItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: ${({ $role }) => ($role === 'bot' ? 'flex-start' : 'flex-end')};
`;

export const MessageText = styled.p`
  padding: 8px 16px;
  color: ${({ $role, $iferror }) =>
    $role === 'user'
      ? '#fff'
      : $iferror && $role === 'bot'
      ? 'red'
      : 'var(--neutral-dark)'};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.7;
  margin-bottom: 4px;
  margin-left: 8px;
  border-radius: ${({ $role }) =>
    $role === 'bot' ? '4px 20px 20px 20px' : '20px 20px 4px 20px'};
  word-wrap: break-word;
  background: ${({ $role }) =>
    $role === 'bot' ? 'var(--grey)' : 'var(--primary-pink)'};
  white-space: pre-line;

  /* color: ${({ $iferror }) => 'red'}; */
`;

export const MessageTime = styled.p`
  color: var(--neutral-light-grey);
  font-size: 10px;
  font-weight: 500;
  line-height: 1.2;
  justify-content: flex-end;
  margin-bottom: 4px;
  border-radius: 100px 20px 4px 100px;
  word-wrap: break-word;
`;
