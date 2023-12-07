import { useSearchParams } from 'react-router-dom';
import { useAuthMutation } from '../../redux/authAPI';

export const Auth = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [logIn] = useAuthMutation();

  const onSubmit = async (botId) => {
    await logIn(botId);
  };

  return (
    <>
      <div>Auth Page</div>
      <button onClick={() => onSubmit({ _id: id })}>Get Chat</button>
    </>
  );
};
