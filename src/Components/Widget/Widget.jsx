import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { MainContainer, ChatLog, InputContainer } from './Widget.styled';
import { Message } from '../Message/Message';
import { MessageButton } from '../MessageButton/MessageButton';
import { UserInput } from '../UserInput/UserInput';
import authSelectors from '../../redux/authSelectors';

export const Widget = () => {
  const botId = useSelector(authSelectors.botId);
  const [messageArr, setMessageArr] = useState([]);
  const [visibleBtnMsg, setVisibleBtnMsg] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef();

  useEffect(() => {
    async function greetings() {
      const greeting =
        'Вибачте, але зараз я проходжу навчання і поки не можу відповідати на Ваші запитання. Заходьте трохи пізніше. Гарного дня!';

      try {
        const response = await fetch(`/greet/${botId}`);
        const data = await response.json();
        setMessageArr((prev) => [
          ...prev,
          {
            id: uuidv4(),
            message: data.message,
            role: 'bot',
            messageTime: moment().format('kk:mm:ss'),
          },
        ]);
      } catch (error) {
        setMessageArr((prev) => [
          ...prev,
          {
            id: uuidv4(),
            message: greeting,
            role: 'bot',
            error: true,
            messageTime: moment().format('kk:mm:ss'),
          },
        ]);
      }
    }
    greetings();
  }, [botId]);

  async function communicateWithBot(message) {
    setIsLoading(true);
    setVisibleBtnMsg(false);
    setMessageArr((prev) => [
      ...prev,
      {
        id: uuidv4(),
        message,
        role: 'user',
        error: false,
        messageTime: moment().format('kk:mm:ss'),
      },
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
        {
          id: uuidv4(),
          message: data.message,
          role: 'bot',
          messageTime: moment().format('kk:mm:ss'),
        },
      ]);
    } catch (error) {
      setMessageArr((prev) => [
        ...prev,
        {
          id: uuidv4(),
          message: errorResponse,
          role: 'bot',
          error: true,
          messageTime: moment().format('kk:mm:ss'),
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, 100);
    }
  }

  return (
    <MainContainer>
      <ChatLog ref={chatRef}>
        <Message messageArr={messageArr} isLoading={isLoading} />
      </ChatLog>
      <InputContainer>
        {visibleBtnMsg && <MessageButton onClickBtn={communicateWithBot} />}
        <UserInput userSubmit={communicateWithBot} />
      </InputContainer>
    </MainContainer>
  );
};

//
