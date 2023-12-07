import Typewriter from 'typewriter-effect';
import Logo from '../../assets/logo.svg';
import {
  MessageBox,
  MessageText,
  MessageTime,
  MessageContainer,
} from './MessageItem.styled';

export const MessageItem = ({ item, isLoading }) => {
  const { role, error, message, messageTime } = item;
  const ifBot = role === 'bot';

  return (
    <MessageContainer $role={role}>
      <MessageBox>
        {ifBot && <img src={Logo} alt='Logo' width={40} />}
        <MessageText $iferror={error} $role={role}>
          {ifBot ? (
            <Typewriter
              options={{
                strings: `${message}`,
                autoStart: true,
                delay: 1,
                cursor: '',
              }}
            />
          ) : (
            message
          )}
        </MessageText>
      </MessageBox>
      <MessageTime>{messageTime}</MessageTime>
    </MessageContainer>
  );
};
