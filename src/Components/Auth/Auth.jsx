import { useSearchParams } from 'react-router-dom';
import { useAuthMutation } from '../../redux/authAPI';
import { AuthContainer, Button } from './Auth.styled';

export const Auth = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [logIn] = useAuthMutation();

  const onSubmit = async (botId) => {
    await logIn(botId);
  };

  return (
    <AuthContainer>
      <Button onClick={() => onSubmit({ _id: id })}>Get Chat</Button>
    </AuthContainer>
  );
};
