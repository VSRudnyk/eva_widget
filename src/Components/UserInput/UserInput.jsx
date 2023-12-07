import { useState } from 'react';
import IconSend from '../../assets/icon_send.svg';
import { Form, Input, SendButton, SendIcon } from './UserInput.styled';

export const UserInput = ({ userSubmit }) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    userSubmit(userInput);
    setUserInput('');
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type='text'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <SendButton>
        <SendIcon src={IconSend} alt='Send icon' />
      </SendButton>
    </Form>
  );
};
