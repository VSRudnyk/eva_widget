import { Routes, Route } from 'react-router-dom';
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
  const token = useSelector(authSelectors.getToken);
  useFetchCurrentBotQuery(null, { skip: !token });
  return (
    <>
    {id}
    <Routes>
      <Route
      path='/'
      element={<Layout />}
      >
        <Route
          path='/auth/:id'
          element={
            <PublicRoute restricted>
              <Auth id={id}/>
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
        </Route>
    </Routes>
    </>
  );
}

export default App;
