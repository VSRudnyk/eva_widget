import { useAuthMutation } from '../../redux/authAPI';
import { AuthContainer, Button } from './Auth.styled';

export const Auth = ({id}) => {
  const [logIn] = useAuthMutation();
  console.log('params id', id);

  const onSubmit = async (botId) => {
    await logIn(botId);
  };

  return (
    <AuthContainer>
      <Button onClick={() => onSubmit({ _id: id })}>Get Chat</Button>
    </AuthContainer>
  );
};
