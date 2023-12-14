import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { MainContainer, ChatLog, InputContainer } from './Widget.styled';
import { MessageButton } from '../MessageButton/MessageButton';
import { UserInput } from '../UserInput/UserInput';
import authSelectors from '../../redux/authSelectors';
import logo from '../../assets/logo.svg';
import './style.css';

export const Widget = () => {
  const spinner = document.getElementById('loader_template');
  const botId = useSelector(authSelectors.botId);
  const [visibleBtnMsg, setVisibleBtnMsg] = useState(true);
  const chatRef = useRef();

  function createMessageContainerForBot() {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');

    const iconElement = document.createElement('img');
    iconElement.src = logo;

    const messageBox = document.createElement('div');
    messageBox.append(iconElement);
    messageContainer.appendChild(messageBox);
    messageBox.classList.add('message-box');

    chatRef.current.appendChild(messageContainer);
    spinner.style.display = 'inline-flex';
    messageBox.append(spinner);

    chatRef.current.scrollTop = chatRef.current.scrollHeight;
    return messageContainer;
  }
  // Змінні для збереження часу останнього повідомлення
  let lastMessageTime = null;
  let currentTimeElement = null;

  const addBotMessageToLog = (messageContainer, message, cssClass) => {
    const messageBox = messageContainer.querySelector('.message-box');
    const messageElement = document.createElement('p');
    messageElement.classList.add('message', 'bot-message', cssClass);
    messageBox.append(messageElement);
    spinner.style.display = 'none';

    let charIndex = 0;
    const typeMessageInterval = setInterval(() => {
      if (charIndex < message.length) {
        const char = message[charIndex];
        messageElement.innerHTML += char;
        chatRef.current.scrollTop = chatRef.current.scrollHeight; // Автоматична прокрутка вниз
        charIndex++;
      } else {
        clearInterval(typeMessageInterval);
        addTimeBelowMessage(messageContainer, 'bot-message-time');
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 15);

    currentTimeElement = messageContainer.querySelector('.message-time');
    lastMessageTime = new Date();
  };

  function addUserMessageToLog(message) {
    const messageContainer = document.createElement('div');
    const messageElement = document.createElement('div');

    const messageClass = 'user-message';
    const messageSender = '';

    messageContainer.classList.add('message-container');
    messageElement.classList.add('message', messageClass);

    messageElement.innerText = `${messageSender} ${message}`;
    messageContainer.appendChild(messageElement);

    currentTimeElement = messageContainer.querySelector('.message-time');
    lastMessageTime = new Date();

    chatRef.current.appendChild(messageContainer);

    addTimeBelowMessage(messageContainer, 'user-message-time');
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }

  function addTimeBelowMessage(messageContainer, timeClass) {
    const currentTime = new Date().toLocaleTimeString();

    const timeElement = document.createElement('div');
    timeElement.classList.add('message-time', timeClass);
    timeElement.innerText = currentTime.slice(0, -3);

    messageContainer.appendChild(timeElement);
  }

  function handleHintMsg(text) {
    setVisibleBtnMsg(false);
    addUserMessageToLog(text);
    communicateWithBot(text);

    chatRef.current.style.minHeight = 'calc(85vh - 80px)';
  }

  useEffect(() => {
    async function greetings() {
      const messageContainer = createMessageContainerForBot();

      try {
        const response = await fetch(`/greet/${botId}`);
        const data = await response.json();
        addBotMessageToLog(messageContainer, data.message);
      } catch (error) {
        addBotMessageToLog(
          messageContainer,
          'Вибачте, але зараз я проходжу навчання і поки не можу відповідати на Ваші запитання. Заходьте трохи пізніше. Гарного дня!',
          'error-text'
        );
      }
    }
    greetings();
  }, [botId]);

  function communicateWithBot(message) {
    const messageContainer = createMessageContainerForBot();
    try {
      const response = fetch(`/chat/${botId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_phrase: message,
        }),
      });
      const data = response.json();
      addBotMessageToLog(messageContainer, data.response);
    } catch (error) {
      setTimeout(function () {
        addBotMessageToLog(
          messageContainer,
          'Наразі я не можу прийняти Ваше повідомлення, спробуйте ще раз!',
          'error-text'
        );
      }, 2000);
    }
  }

  return (
    <MainContainer>
      <ChatLog ref={chatRef}></ChatLog>
      <InputContainer>
        {visibleBtnMsg && <MessageButton onClickBtn={handleHintMsg} />}
        <UserInput userSubmit={handleHintMsg} />
      </InputContainer>
    </MainContainer>
  );
};

//
