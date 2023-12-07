import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  gap: 8px;
`;

export const Input = styled.input`
  display: flex;
  padding: 8px 20px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 32px;
  border: 1px solid var(--neutral-light-grey);
  outline: none;
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
`;

export const SendButton = styled.button`
  display: flex;
  padding: 4px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 50%;
  border: none;
  background: var(
    --primary-gradient,
    linear-gradient(90deg, #ed3984 0%, #ed3984 1.56%, #7452c8 100%)
  );
`;

export const SendIcon = styled.img`
  width: 32px;
  height: 32px;
  padding: 4px;
`;
