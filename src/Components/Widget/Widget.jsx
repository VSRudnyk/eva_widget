import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { MainContainer, ChatLog, InputContainer } from './Widget.styled';
import { Message } from '../Message/Message';
import { MessageButton } from '../MessageButton/MessageButton';
import { UserInput } from '../UserInput/UserInput';
import authSelectors from '../../redux/authSelectors';

export const Widget = () => {
  const botId = useSelector(authSelectors.botId);
  console.log(botId);
  const [messageArr, setMessageArr] = useState([]);
  const [visibleBtnMsg, setVisibleBtnMsg] = useState(true);

  useEffect(() => {
    async function greetings() {
      const greeting =
        'Вибачте, але зараз я проходжу навчання і поки не можу відповідати на Ваші запитання. Заходьте трохи пізніше. Гарного дня!';
      try {
        const response = await fetch(`/greet/${botId}`);
        const data = await response.json();
        setMessageArr((prev) => [
          ...prev,
          { id: uuidv4(), message: data.message, role: 'bot' },
        ]);
      } catch (error) {
        setMessageArr((prev) => [
          ...prev,
          {
            id: uuidv4(),
            message: greeting,
            role: 'bot',
            error: true,
          },
        ]);
      }
    }
    greetings();
  }, [botId]);

  async function communicateWithBot(message) {
    setVisibleBtnMsg(false);
    setMessageArr((prev) => [
      ...prev,
      { id: uuidv4(), message, role: 'user', error: false },
    ]);
    const errorResponse =
      'Наразі я не можу прийняти Ваше повідомлення, спробуйте ще раз!';
    try {
      const response = await fetch(`/chat/${botId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_phrase: message,
        }),
      });
      const data = await response.json();
      setMessageArr((prev) => [
        ...prev,
        { id: uuidv4(), message: data.message, role: 'bot' },
      ]);
    } catch (error) {
      setMessageArr((prev) => [
        ...prev,
        {
          id: uuidv4(),
          message: errorResponse,
          role: 'bot',
          error: true,
        },
      ]);
    }
  }

  return (
    <MainContainer>
      <ChatLog>
        <Message messageArr={messageArr} />
      </ChatLog>
      <InputContainer>
        {visibleBtnMsg && <MessageButton onClickBtn={communicateWithBot} />}
        <UserInput userSubmit={communicateWithBot} />
      </InputContainer>
    </MainContainer>
  );
};

//
