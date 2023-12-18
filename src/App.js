import { Routes, Route } from 'react-router-dom';
import { Layout } from './Components/Layout';
import { PrivateRoute } from './Components/PrivateRoute';
import { PublicRoute } from './Components/PublicRoute';
import { Auth } from './Components/Auth/Auth';
import { Widget } from './Components/Widget/Widget';
import { useSelector } from 'react-redux';
import authSelectors from '../src/redux/authSelectors';
import { useFetchCurrentBotQuery, useAuthMutation } from './redux/authAPI';
import { useSearchParams } from 'react-router-dom';
import './index.css';
import { useEffect } from 'react';

function App() {
  const [logIn, {isSuccess}] = useAuthMutation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
 
  const token = useSelector(authSelectors.getToken);
  useFetchCurrentBotQuery(null, { skip: !token });

  useEffect(() => {
    const loginBot = async (botId) => {
      await logIn(botId)
    };
    loginBot({_id: id})
  }, []);

  return (
    <>
    {isSuccess && <Widget/>}
    </>
  );
}

export default App;
