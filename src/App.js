import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Components/Layout';
import { PrivateRoute } from './Components/PrivateRoute';
import { PublicRoute } from './Components/PublicRoute';
import { Auth } from './Components/Auth/Auth';
import { Widget } from './Components/Widget/Widget';
import { useSelector } from 'react-redux';
import authSelectors from '../src/redux/authSelectors';
import { useFetchCurrentBotQuery } from './redux/authAPI';
import { useSearchParams } from 'react-router-dom';
import './index.css';

function App() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  localStorage.setItem('userId', id)
  const token = useSelector(authSelectors.getToken);
  useFetchCurrentBotQuery(null, { skip: !token });
  return (
    <>
    <Layout />
    <p>{id}</p>
    <Routes>
        <Route
          path='/auth'
          element={
            <PublicRoute restricted>
              <Auth />
            </PublicRoute>
          }
        />
        <Route
          path='/widget'
          element={
            <PrivateRoute>
              <Widget />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<Navigate to='/auth'/>} />
    </Routes>
    </>
  );
}

export default App;
