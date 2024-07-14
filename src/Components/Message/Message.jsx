import { MessageItem } from '../MessageItem/MessageItem';

export const Message = ({ messageArr }) => {
  return (
    <ul>
      {messageArr.map((item) => {
        return <MessageItem item={item} key={item.id} />;
      })}
    </ul>
  );
};
