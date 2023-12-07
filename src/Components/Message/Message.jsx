import { MessageItem } from '../MessageItem/MessageItem';

export const Message = ({ messageArr, isLoading }) => {
  return (
    <ul>
      {messageArr.map((item) => {
        return <MessageItem item={item} isLoading={isLoading} key={item.id} />;
      })}
    </ul>
  );
};
