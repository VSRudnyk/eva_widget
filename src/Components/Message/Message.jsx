import * as moment from 'moment';
import Logo from '../../assets/logo.svg';
import {
  MessageBox,
  MessageText,
  MessageTime,
  MessageItem,
} from './Message.styled';

export const Message = ({ messageArr }) => {
  const messageTime = moment().format('kk:mm');

  return (
    <ul>
      {messageArr.map((item) => {
        return (
          <MessageItem key={item.id} $role={item.role}>
            <MessageBox>
              {item.role === 'bot' && <img src={Logo} alt='Logo' width={40} />}
              <MessageText $iferror={item.error} $role={item.role}>
                {item.message}
              </MessageText>
            </MessageBox>
            <MessageTime>{messageTime}</MessageTime>
          </MessageItem>
        );
      })}
    </ul>
  );
};
